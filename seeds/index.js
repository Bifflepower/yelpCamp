const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database Connected')
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Campground.deleteMany()
    for (let i = 0; i < 50; i++ ){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6643676bff92633c5dedf3ce',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magni ut adipisci illum, voluptatum, corrupti laudantium itaque officia facilis, qui voluptatem dolores saepe inventore quod beatae accusantium officiis ad ipsum!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzdejlsud/image/upload/v1698945068/YelpCamp/xniuna2r7d7iryz9jnyk.jpg',
                    filename: 'YelpCamp/xniuna2r7d7iryz9jnyk'
                  },
                  {
                    url: 'https://res.cloudinary.com/dzdejlsud/image/upload/v1698945069/YelpCamp/reffhvzoovukqd03pmqx.jpg',
                    filename: 'YelpCamp/reffhvzoovukqd03pmqx'
                  }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log('Disconnected from Database')
})