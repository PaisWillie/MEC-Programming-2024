const getUser = (req, res) => {
    res.json({ message: 'User information retrieved successfully' });
};

const createUser = (req, res) => {
    res.json({ message: 'User created successfully' });
};

export { getUser, createUser };