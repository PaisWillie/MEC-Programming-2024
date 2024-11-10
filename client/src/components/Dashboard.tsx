import { useAuth0 } from '@auth0/auth0-react'
import type { TableColumnsType } from 'antd'
import { Button, Flex, Input, Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import React, { useState, useEffect } from 'react'
import {
  RiBankCardLine,
  RiExpandUpDownLine,
  RiFileCloudLine,
  RiGatsbyFill,
  RiLifebuoyLine,
  RiLockPasswordLine,
  RiLogoutBoxRLine,
  RiSearch2Line,
  RiShareLine
} from 'react-icons/ri'
import { usePasswordService } from '../service/password.service'
import { useNavigate } from 'react-router-dom'

interface DataType {
  key: React.Key
  company: string
  age: number
  address: string
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'company' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' }
]

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    key: i,
    company: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
)

function Dashboard() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState<number>(-1)
  const { user, logout, isAuthenticated } = useAuth0()
  const [passwords, setPasswords] = useState<any[]>([])
  const [error, setError] = useState<string>('')
  const fetchPasswordService = usePasswordService()

  const navigate = useNavigate()

  // Check authentication status and redirect if necessary
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the PasswordManagerHome after login
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const navItems: {
    icon: JSX.Element
    title: string
    onClick?: () => void
  }[][] = [
    [
      {
        icon: <RiLockPasswordLine />,
        title: 'Passwords'
      },
      {
        icon: <RiFileCloudLine />,
        title: 'Secure Notes'
      },
      {
        icon: <RiBankCardLine />,
        title: 'Payments'
      }
    ],
    [
      {
        icon: <RiShareLine />,
        title: 'Sharing Center'
      },
      {
        icon: <RiLifebuoyLine />,
        title: 'Support'
      },
      {
        icon: <RiLogoutBoxRLine />,
        title: 'Log Out',
        onClick: logout
      }
    ]
  ]

  const start = (index: number) => {
    setLoading(index)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(-1)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  useEffect(() => {
    const getPasswords = async () => {
      if (isAuthenticated) {
        try {
          const passwordService = await fetchPasswordService()
          const data = await passwordService.getPasswords()
          setPasswords(data)
        } catch (error) {
          setError('Failed to load passwords')
        }
      }
    }

    getPasswords()
  }, [isAuthenticated, fetchPasswordService])

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div className="grid min-h-screen grid-cols-12 p-4">
      {/* Navigation Sidebar */}
      <div id="nav" className="fixed col-span-2 flex flex-col">
        <div
          id="account-select"
          className="flex flex-row items-center justify-between gap-x-2 rounded-md p-2 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200"
        >
          <div className="flex flex-row items-center gap-x-3">
            <div className="flex flex-col items-center justify-center rounded-lg bg-blue-600 p-2 text-white">
              <RiGatsbyFill className="text-3xl" />
            </div>
            <div className="flex flex-col leading-5">
              <div className="font-bold">{user?.name}</div>
              <div className="text-xs text-slate-600">{user?.email}</div>
            </div>
          </div>
          <RiExpandUpDownLine />
        </div>
        <Input
          size="large"
          placeholder="Search"
          prefix={<RiSearch2Line />}
          className="mt-4"
        />
        <div id="nav-items" className="mt-4 text-slate-700">
          {navItems.map((items, index) => (
            <div key={index}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center gap-x-2 rounded-md p-2 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200"
                  onClick={item.onClick}
                >
                  {item.icon}
                  {item.title}
                </div>
              ))}
              {index !== navItems.length - 1 && (
                <div className="my-2 border-t border-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2" />
      <div id="main-content" className="col-span-10 flex w-full flex-col px-6">
        <h1 className="mt-2 text-xl font-bold">Passwords</h1>
        <Flex gap="middle" vertical className="mt-8">
          <Flex align="center" gap="middle">
            <Button
              type="primary"
              onClick={() => {
                start(0)
              }}
              disabled={!hasSelected}
              loading={loading === 0}
            >
              Move
            </Button>
            <Button
              type="default"
              color="default"
              onClick={() => {
                start(1)
              }}
              disabled={!hasSelected}
              loading={loading === 1}
            >
              Archive
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                start(2)
              }}
              disabled={!hasSelected}
              loading={loading === 2}
            >
              Delete
            </Button>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </Flex>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 30 }} // Specify the number of rows per page
          />
        </Flex>
      </div>
    </div>
  )
}

export default Dashboard
