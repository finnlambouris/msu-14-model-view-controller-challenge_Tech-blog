const sequelize = require('../config/connection');
const { Blogpost, Comment, User } = require('../models/index.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
        {
            username: 'spidermanfan',
            password: 'password',
        },
        {
            username: 'chloeprice',
            password: 'password',
        },
        {
            username: 'monkeyball',
            password: 'password',
        },
        {
            username: 'iluvskiing',
            password: 'password',
        }], 
        {
            individualHooks: true,
            returning: true,
        }
    );

    const blog = await Blogpost.bulkCreate([
        {
            title: 'blogpost 1',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
            user_id: 1,
        },
        {
            title: 'blogpost 2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
            user_id: 2,
        },
        {
            title: 'blogpost 3',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
            user_id: 3,
        },
        {
            title: 'blogpost 4',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus porttitor risus, non euismod mauris blandit vel. Duis eget venenatis nisi. Pellentesque cursus placerat rhoncus.',
            user_id: 4,
        }], 
        {
            individualHooks: true,
            returning: true,
        }
    );

    const comments = await Comment.bulkCreate([
        {
            comment: 'Cool post!',
            user_id: 2,
            blogpost_id: 1,
        },
        {
            comment: 'This post sucks!',
            user_id: 3,
            blogpost_id: 2,
        },
        {
            comment: 'kys',
            user_id: 4,
            blogpost_id: 3,
        },
        {
            comment: 'stan LOONA',
            user_id: 1,
            blogpost_id: 4,
        }], 
        {
            individualHooks: true,
            returning: true,
        }
    );
};

seedDatabase();