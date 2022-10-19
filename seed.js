const { green, red } = require('chalk')
const { db, Students, Campuses } = require('./server/db/index')


const addCampuses = async() => {
  const USC = {
    name: "University of South Carolina",
    imageUrl: "https://www.sc.edu/imgs/background/background-campus-tours-31.jpg",
    adress: "University of South Carolina Columbia, SC 29208",
    description: "There's much to learn about the university that's been in the heart of South Carolina for more than 200 years and counting. Take a closer look at our accomplishments, aspirations and the people who make us successful. The University of South Carolina is a storied setting where academic and professional ambitions come to life every day. Whether in quiet Horseshoe study sessions or energizing student experiences, our campus has a long history of preparing the next generation of leaders. Get to know us better through our historic moments and milestones, or learn how you can be part of it all as a member of our faculty or staff. Connect with the people who are shaping our future today.",
  }

  const NYU = {
    name: "New York University",
    imageUrl: "https://www.thoughtco.com/thmb/XOPDHsYHwaRSO9YCGcWZANhGDto=/3435x2576/smart/filters:no_upscale()/washington-square-park--new-york-city--usa-591496237-5c0f20eac9e77c0001c27596.jpg",
    adress: "New York, NY 10012",
    description: "Since its founding in 1831, NYU has been an innovator in higher education, reaching out to an emerging middle class, embracing an urban identity and professional focus, and promoting a global vision that informs its 19 schools and colleges. Today, that trailblazing spirit makes NYU one of the most prominent and respected research universities in the world, featuring top-ranked academic programs and accepting fewer than one in eight undergraduates. Anchored in New York City and with degree-granting campuses in Abu Dhabi and Shanghai as well as 12 study away sites throughout the world, NYU is a leader in global education, with more international students and more students studying abroad than any other US university.",
  }

  const RCC = {
    name: "Rockland Community College",
    imageUrl: "https://www.higheredjobs.com/images/AccountImages/403_2.jpg",
    adress: "145 College Rd, Suffern, NY 10901",
    description: "MISSION Rockland Community College provides purpose driven educational opportunities and guidance in a diverse, affordable, and accessible environment, empowering individuals to positively transform themselves and their communities. VISION Rockland Community College is the national leader in effective institutional collaborations that improve the lives of our students and the vitality of the community. VALUESAs a community of care, Rockland Community College approaches all aspects of the work of the College with integrity, on campus and beyond. Our values are: Excellence Engagement Collaboration Social Consciousness Innovation",
  }

  const Berklee = {
    name: "Berklee College of Music",
    imageUrl: "https://www.berklee.edu/sites/default/files/styles/scale_and_crop_8_5_medium/public/2021-01/WWW-Admissions-BCM.jpg?fv=ixrIlUbd&itok=x1zdVOIw",
    adress: "Boston, MA 02215",
    description: "Since its founding in 1831, NYU has been an innovator in higher education, reaching out to an emerging middle class, embracing an urban identity and professional focus, and promoting a global vision that informs its 19 schools and colleges. Today, that trailblazing spirit makes NYU one of the most prominent and respected research universities in the world, featuring top-ranked academic programs and accepting fewer than one in eight undergraduates. Anchored in New York City and with degree-granting campuses in Abu Dhabi and Shanghai as well as 12 study away sites throughout the world, NYU is a leader in global education, with more international students and more students studying abroad than any other US university.",
  }

  await Campuses.create(NYU)
  await Campuses.create(RCC)
  await Campuses.create(USC)
  await Campuses.create(Berklee)
}

const addStudents = async() => {
  const Aang = {
    firstName: "Avatar",
    lastName: "Aang",
    email: "penguinSledder@gmail.com",
    imageUrl: "https://www.looper.com/img/gallery/why-aangs-power-in-avatar-the-last-airbender-is-more-terrifying-than-you-think/intro-1616420787.jpg",
    gpa: 2.7,
    CampusId: 1,
  }
  const JonSnow = {
    firstName: "Aegon",
    lastName: "Targaryan",
    email: "kingInTheNorth@gmail.com",
    imageUrl: "https://media.gq-magazine.co.uk/photos/62ac38f82da9f5f89888eba9/16:9/w_1280,c_limit/jon-snow-series-1200.jpeg",
    gpa: 3.0,
    CampusId: 2,
  }
  const Jesse = {
    firstName: "Jesse",
    lastName: "Pinkman",
    email: "pinkman@gmail.com",
    imageUrl: "https://i.insider.com/5d9f3f5183486904582ee506?width=750&format=jpeg&auto=webp",
    gpa: 1.2,
    CampusId: 3,
  }
  const Hozier = {
    firstName: "Andrew",
    lastName: "Hozier-Byrnes",
    email: "fromeden@gmail.com",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb9ba4d95b74bacff4d5747f61",
    gpa: 3.5,
    CampusId: 4,
  }
  await Students.create(Hozier)
  await Students.create(Jesse)
  await Students.create(JonSnow)
  await Students.create(Aang)
}

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!
    await addCampuses()
    await addStudents()

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