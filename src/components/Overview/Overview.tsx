import React from "react"

import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Overview: React.FC = () => {
  return (
    <div style={{ fontSize: "1.3rem", lineHeight: "30pt" }}>
      <p className='mt-4'>
        Welcome to Gateway Gamers, where passion for tabletop gaming meets innovative solutions for organizing your
        gaming world. At Gateway Gamers, we understand the challenges that avid board game enthusiasts face in managing
        their extensive game collections. That is why we have developed Board Game Keep, a revolutionary solution
        designed to simplify and enhance your gaming experience.
      </p>
      <h2 className='mt-4 text-primary font-semibold'>About Us: Gateway Gamers</h2>
      <p>
        At Gateway Gamers, our mission is to bridge the gap between the joy of tabletop gaming and the need for
        efficient organization. We recognize that a well-curated game closet is crucial for every dedicated gamer, and
        Board Game Keep is here to be your go-to companion in managing your board game collection.
      </p>
      <h2 className='mt-4 text-secondary font-semibold'>Why Board Game Keep?</h2>
      <p>
        Board Game Keep is more than just an inventory management tool; it is a comprehensive system tailored to meet
        the unique needs of board game enthusiasts. Whether you are a casual gamer or a seasoned collector, our platform
        allows you to effortlessly organize and track your board game library.
      </p>
      <h2 className='mt-4 text-primary font-semibold'>Key Features:</h2>
      <dl>
        <dt>
          <FontAwesomeIcon icon={faDiceOne} className='text-secondary text-2xl' /> Game Shelves
        </dt>
        <dd>
          Easily categorize your board games into &quot;Owned,&quot; &quot;Want to Play,&quot; and &quot;Not
          Interested&quot; shelves. Keep your collection organized and prioritize the games that matter most to you.
        </dd>

        <dt>
          <FontAwesomeIcon icon={faDiceTwo} className='text-primary text-2xl' /> Loan Tracker
        </dt>
        <dd>
          Never lose track of your borrowed board games again. Board Game Keep lets you record when you loaned out a
          game, to whom, and serves as a reminder to ensure your beloved games find their way back home.
        </dd>

        <dt>
          <FontAwesomeIcon icon={faDiceThree} className='text-secondary text-2xl' /> Intuitive Interface
        </dt>
        <dd>
          Our user-friendly interface ensures a seamless experience, making it simple for you to navigate and manage
          your board game library. Spend less time organizing and more time enjoying your games.
        </dd>

        <dt>
          <FontAwesomeIcon icon={faDiceFour} className='text-primary text-2xl' /> Customizable Collections
        </dt>
        <dd>
          Tailor your shelves to fit your unique gaming preferences. Whether you have a penchant for strategy games,
          party games, or a mix of both, Board Game Keep allows you to create personalized collections within your
          library.
        </dd>
      </dl>
      <h2 className='mt-4 about-header'>Join the Gateway Gamers Community</h2>
      <p>
        Gateway Gamers is more than just a platform; it is a community of like-minded individuals who share a passion
        for tabletop gaming. Connect with fellow gamers, exchange recommendations, and discover new gems to add to your
        collection. At Gateway Gamers, we are committed to enhancing your gaming lifestyle. Board Game Keep is the
        solution you have been searching for – your gateway to an organized, enjoyable, and stress-free gaming
        experience. Explore the world of tabletop gaming with confidence, knowing that your game closet is in expert
        hands. Welcome to Gateway Gamers – where every game has its place.
      </p>
    </div>
  )
}

export default Overview
