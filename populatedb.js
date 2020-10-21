#! /usr/bin/env node

console.log('This script populates some plants and categories to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
var Plant = require('./models/plant')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var plants = []
var categories = []

randomNumberInRange = (min, max) => Math.floor((Math.random() * (max - min) + min));

function plantCreate(name, description, category, url, cb) {
    let plantdetail = {
        name,
        price: randomNumberInRange(5, 26) * 2,
        in_stock: randomNumberInRange(1, 50),
    }
    if (description) plantdetail.description = description;
    if (category) plantdetail.category = category;
    if (url) plantdetail.url = url;

    var plant = new Plant(plantdetail);

    plant.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Plant: ' + plant);
        plants.push(plant)
        cb(null, plant)
    });
}

function categoryCreate(name, description, url, cb) {
    let categorydetail = {
        name
    };
    if (description) categorydetail.description = description;
    if (url) categorydetail.url = url;

    var category = new Category(categorydetail);

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New category: ' + category);
        categories.push(category)
        cb(null, category);
    });
}

function createcategories(cb) {
    async.parallel([
            // Crotons
            function (callback) {
                categoryCreate('Euphorbiaceae', 'The Euphorbiaceae are a large family, the spurge family, of flowering plants. In common English, they are sometimes called euphorbias, which is also the name of a genus in the family.', false, callback);
            },
            function (callback) {
                categoryCreate('Asparagus', 'Asparagus is a family of flowering plants, placed in the order Asparagales of the monocots.[1] Its best known member is Asparagus officinalis, garden asparagus.', false, callback);
            },
            function (callback) {
                categoryCreate('Orchids', 'The Orchids family are a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant, commonly known as the orchid family. Along with the Asteraceae, they are one of the two largest families of flowering plants.', false, callback);
            },
            function (callback) {
                categoryCreate('Araceae', 'The Araceae are a family of monocotyledonous flowering plants in which flowers are borne on a type of inflorescence called a spadix. The spadix is usually accompanied by, and sometimes partially enclosed in, a spathe or leaf-like bract. Also known as the arum family, members are often colloquially known as aroids.', false, callback);
            },
            function (callback) {
                categoryCreate('Arecaceae', 'The Arecaceae are a botanical family of perennial flowering plants in the monocot order Arecales. Their growth form can be climbers, shrubs, tree-like and stemless plants, all commonly known as palms. Those having a tree-like form are colloquially called palm trees.', false, callback);
            },
        ],
        // optional callback
        cb);
}

function createplants(cb) {
    async.parallel([
            // Crotons
            function (callback) {
                plantCreate('Croton', 'Croton is an extensive flowering plant genus in the spurge family, Euphorbiaceae. The plants of this genus were described and introduced to Europeans by Georg Eberhard Rumphius. The common names for this genus are rushfoil and croton, but the latter also refers to Codiaeum variegatum.', [categories[0], ], false, callback);
            },
            function (callback) {
                plantCreate('Lemon Lime Dracaena', 'The Dracaena Lemon Lime stands out among its genus for its namesake neon yellow and green striped leaves, but much like the rest of its family its care is relatively straightforward. Capable of reaching heights of 5-7 feet indoors, it can also be kept to a tabletop size with regular pruning.', [categories[1], ], false, callback);
            },
            function (callback) {
                plantCreate('Moth Orchid', 'Phalaenopsis Blume, commonly known as moth orchids, is a genus of about seventy species of plants in the family Orchidaceae.', [categories[2], ], false, callback);
            },
            function (callback) {
                plantCreate('Anthurium', 'Anthurium, is a genus of about 1000 species of flowering plants, the largest genus of the arum family, Araceae. General common names include anthurium, tailflower, flamingo flower, and laceleaf.', [categories[3], ], false, callback);
            },
            function (callback) {
                plantCreate('Golden Pothos', "The plant has a multitude of common names including golden pothos, Ceylon creeper,[2] hunter's robe, ivy arum, money plant, silver vine, Solomon Islands ivy, marble queen, and taro vine. It is also called devil's vine or devil's ivy because it is almost impossible to kill and it stays green even when kept in the dark.", [categories[3], ], false, callback);
            },
            function (callback) {
                plantCreate('Lucky Bamboo', `Dracaena sanderiana is a species of flowering plant in the family Asparagaceae, native to Central Africa. It was named after the German–English gardener Henry Frederick Conrad Sander. The plant is commonly marketed as "lucky bamboo".`, [categories[1], ], false, callback);
            },
            function (callback) {
                plantCreate('Dracaena Marginata', `Dracaena marginata, or the dragon tree, is a houseplant that has elegant long, thin leaves with red edges. The lower leaves gradually fall away to reveal a thin trunk. The dragon tree looks good on its own and is also useful for providing height among a group of houseplants.`, [categories[1], ], false, callback);
            },
            function (callback) {
                plantCreate('Snake Plant', `Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo. It is most commonly known as the snake plant, Saint George's sword, mother-in-law's tongue, and viper's bowstring hemp, among other names.`, [categories[1], ], false, callback);
            },
            function (callback) {
                plantCreate('Peace Lily', `Spathiphyllum is a genus of about 47 species of monocotyledonous flowering plants in the family Araceae, native to tropical regions of the Americas and southeastern Asia. Certain species of Spathiphyllum are commonly known as spath or peace lilies.`, [categories[3], ], false, callback);
            },
            function (callback) {
                plantCreate('Ponytail Palm', `Beaucarnea recurvata, the elephant's foot or ponytail palm, is a species of plant in the family Asparagaceae, native to the states of Tamaulipas, Veracruz and San Luis Potosí in eastern Mexico. Despite its common name, it is not closely related to the true palms.`, [categories[1], ], false, callback);
            },
            function (callback) {
                plantCreate('Majesty Palm', `Ravenea rivularis, the majestic palm, or majesty palm, is a species of tree in the family Arecaceae. While often marketed in stores as a "plant" in a pot, in its natural state, the majesty palm grows to 98 feet tall. The palm has upward-arching leaves divided into long, thin fingers.`, [categories[4], ], false, callback);
            },
        ],
        // optional callback
        cb);
}

async.series([
        createcategories,
        createplants,
    ],

    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('The database was successfully populated!');

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });