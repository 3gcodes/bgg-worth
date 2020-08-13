## BGG Worth

There used to be a site that would determine your BGG Collection value, but it no longer works.
I decided to take a crack at it. It's not smart at all. Basically, it does the following:

- looks up your collection
- finds all the ID's
- looks up each game in the BGG Market
- grabs pricing from first page of results and averages them
- sums all the prices for your value total.

Things I don't care about

- Game condition. This can be tweaked in the API call.
- Euro vs US Dollar. It just uses whatever it finds and averages.

This is not meant to be a "to the penny" valuation. It was more curious and just wanted a general idea 
of what my collection was worth. Do what you want with this code. Feel free to drop any PR's if you think you can improve things.

### run the code
- make sure you have node installed
- `npm` or `yarn` to pull dependencies
- make sure you update the bggUrl with your BGG Username
- `node app.js`
- Depending on your collection size, it could take a while.

Don't blame me if you remove the 1s delay between market calls and BGG blacklists you for a DDOS attack.