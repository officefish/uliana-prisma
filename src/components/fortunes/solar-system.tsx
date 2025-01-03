import { FC } from "react"

const SolarSystem: FC = () => {

    return (  
      <section className="universe">
    
        <ul className="solarsystem">
          <li className="sun"><span></span></li>
          <li className="mercury"><span>Mercury</span></li>
          <li className="venus"><span>Venus</span></li>
          <li className="earth"><span>Earth<span className="moon"> &amp; Moon</span></span></li>
          <li className="mars"><span>Mars</span></li>
          <li className="asteroids_meteorids"><span>Asteroids &amp; Meteorids</span></li>
          <li className="jupiter"><span>Jupiter</span></li>
          <li className="saturn"><span>Saturn &amp; <span className="ring">Ring</span></span></li>
          <li className="uranus"><span>Uranus</span></li>
          <li className="neptune"><span>Neptune</span></li>
          <li className="pluto"><span>Pluto</span></li>
        </ul>
    
      </section>)
}
export default SolarSystem