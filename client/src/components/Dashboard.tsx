import { useAuth0 } from '@auth0/auth0-react'
import type { TableColumnsType } from 'antd'
import { Button, Flex, Input, Modal, Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import React, { useState, useEffect, useMemo } from 'react'
import {
  RiAddFill,
  RiEyeOffFill,
  RiEyeFill,
  RiAddLargeFill,
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
import { Form, Input as AntInput } from 'antd'

// const columns: TableColumnsType<DataType> = [
//   {
//     title: 'Platform',
//     dataIndex: 'platform',
//     key: 'platform'
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name'
//   },
//   {
//     title: 'Password',
//     dataIndex: 'password',
//     key: 'password'
//   }
// ]

interface DataType {
  key: React.Key
  platform: string
  name: string
  password: string
  // type: string
}

function Dashboard() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState<number>(-1)
  const { user, logout, isAuthenticated } = useAuth0()
  const [passwords, setPasswords] = useState<DataType[]>([])
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({})

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Check authentication status and redirect if necessary
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to the PasswordManagerHome after login
      navigate('/')
    }
  }, [isAuthenticated, navigate, loading])

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

  const fetchPasswordService = useMemo(() => usePasswordService(), []);

  // Function to load passwords from the server
  const loadPasswords = async () => {
    try {
      const passwordService = await fetchPasswordService()
      const data = await passwordService.getPasswords()
      const dataSource = data.map((item: any, index: number) => ({
        key: index,
        platform: item.platform,
        name: item.username,
        password: item.password,
      }))
      setPasswords(dataSource)
    } catch (error) {
      setError('Failed to load passwords')
    }
  }

  useEffect(() => {
    loadPasswords() // Load passwords on component mount
  }, [fetchPasswordService])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        fetchPasswordService()
          .then((passwordService) => {
            const payload = {
              platform: values.title,
              username: values.username,
              password: values.password,
            }
            return passwordService.addPassword(payload)
          })
          .then(() => {
            setIsModalOpen(false)
            form.resetFields()
            loadPasswords() // Refresh the password list after adding a new password
          })
          .catch((error) => {
            console.error('Failed to add password:', error)
            setError('Failed to add password')
          })
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const handleDelete = async (key: number) => {
    fetchPasswordService()
      .then((passwordService) => {
        const promises = selectedRowKeys.map((key) => {
          const password = passwords.find((item) => item.key === key)
          return passwordService.deletePassword(password?.platform as string)
        })
        return Promise.all(promises)
      })
      .then(() => {
        setSelectedRowKeys([])
        loadPasswords() // Refresh the password list after deleting a password
      })
      .catch((error) => {
        console.error('Failed to delete password:', error)
        setError('Failed to delete password')
      })
  }

  const hasSelected = selectedRowKeys.length > 0

  const togglePasswordVisibility = (index: number) => {
    setShowPassword(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }
  const columns: TableColumnsType<DataType> = [
    { title: 'Platform', dataIndex: 'platform' },
    { title: 'Username', dataIndex: 'name' },
    {
      title: 'Password',
      dataIndex: 'password',
      render: (_, record, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showPassword[index] ? record.password : '••••••••'}
          <Button
            type="text"
            icon={showPassword[index] ? <RiEyeOffFill /> : <RiEyeFill />}
            onClick={() => togglePasswordVisibility(index)}
          />
        </div>
      ),
    }
  ]

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
            <div className="flex w-full flex-row justify-between gap-x-4">
              <div className="flex flex-row gap-x-4">
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
                    handleDelete(selectedRowKeys[0] as number)
                  }}
                  disabled={!hasSelected}
                  loading={loading === 2}
                >
                  Delete
                </Button>
              </div>
              <Button color="primary" variant="solid" onClick={showModal}>
                <RiAddLargeFill /> Password
              </Button>
              <Modal
                title="Enter New Password Item"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      { required: true, message: 'Please enter the title' }
                    ]}
                  >
                    <AntInput />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                      { required: true, message: 'Please enter the username' }
                    ]}
                  >
                    <AntInput />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: 'Please enter the password' },
                      { min: 8, message: 'Password must be at least 8 characters' },
                      { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
                      { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
                      { pattern: /\d/, message: 'Password must contain at least one number' },
                      { pattern: /[!@#$%^&*]/, message: 'Password must contain at least one special character (!@#$%^&*)' },
                    ]}
                  >
                    <AntInput.Password />
                  </Form.Item>
                  {/* <Form.Item
                    name="website"
                    label="Website"
                    rules={[
                      { required: true, message: 'Please enter the website' }
                    ]}
                  >
                    <AntInput />
                  </Form.Item> */}
                </Form>
              </Modal>
            </div>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </Flex>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={passwords}
            pagination={{ pageSize: 30 }} // Specify the number of rows per page
          />
        </Flex>
      </div>
    </div>
  )
}

export default Dashboard
