const { green, red } = require('chalk')
const { db } = require('./server/db')

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!
  } catch (err) {
    console.log(red(err))
  }
}

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)

async function runSeed() {
  try {
    await seed()
    console.log(green('Seeding success!'))
  } catch (err) {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
  } finally {
    db.close()
  }
}

if (require.main === module) {
  runSeed()
}
