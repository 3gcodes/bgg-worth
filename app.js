const axios = require('axios');
const parseString = require('xml2js').parseString;
var fs = require('fs');

const bggUrl = 'https://www.boardgamegeek.com/xmlapi2/collection?username=PowrThru&brief=1&own=1';

let ids = [];
let prices = [];

// hey, look at these async/await shananigans
run();
async function run() {
    await foo();
    console.log("Found pricing for this many games", prices.length);
    var sum = prices.reduce((a, b) => {
        return a+b;
    });
    console.log("Grand total", sum);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function foo() {
     
    const response = await axios.get(bggUrl);

    if (response.status === 200) {
        parseString(response.data, (err, result) => {
            result.items.item.map(item => {
                ids.push(item.$.objectid);
            });
        });

        console.log("Found this many games", ids.length);

        
        for (var i = 0; i < ids.length; i++) {

            const r2 = await axios.get('https://api.geekdo.com/api/geekmarket/products?ajax=1&browsetype=browse&colluserid=0&condition=any&country=any&currency=any&displaymode=list&eventid=0&findmywants=0&inventorytype=any&marketdomain=boardgame&nosession=1&objectid=' + ids[i] + '&objecttype=thing&pageid=1&productstate=active&shiparea=any&sort=recent&stock=instock&userid=0');
            const market = r2.data;
            const products = market.products;
                        
            let p = 0;
            products.map(product => {
                try {
                    if (isNaN(product.price)) {
                        console.log("invalid number: " + product.price);
                    } else if (product.price <= 1000.00) {
                        p = p + parseFloat(product.price);
                    }          
                }catch(e) {
                    console.log("Got an error", e);
                }
                
            });
            if (p > 0) {
                const value = parseFloat(p / products.length);
                prices.push(value)
            }

            // let's not get blacklisted for a DDOS attack, wait a bit between requests
            await sleep(500);
        };
    }
}
