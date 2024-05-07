const sequelize = require('../config/connection');
const Blogpost = require('../models/Blogpost');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const blog = await Blogpost.bulkCreate([
    {
        title: 'blogpost 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
        username: 'user1',
    },
    {
        title: 'blogpost 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
        username: 'user2',
    },
    {
        title: 'blogpost 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
        username: 'user3',
    },
    {
        title: 'blogpost 4',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
        username: 'user4',
    }], 
    {
        individualHooks: true,
        returning: true,
    });
};

seedDatabase();
