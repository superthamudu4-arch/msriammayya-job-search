import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt, FaBriefcase, FaRupeeSign} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobData} = props

  return (
    <Link to={`/jobs/${jobData.id}`} className="link-item">
      <li className="job-card">
        <div className="top">
          <img src={jobData.companyLogoUrl} alt="company logo" />
          <div>
            <h3>{jobData.title}</h3>
            <p className="job-rating">
              <FaStar /> {jobData.rating}
            </p>
          </div>
        </div>

        <div className="middle">
          <p>
            <FaMapMarkerAlt /> {jobData.location}
          </p>
          <p>
            <FaBriefcase /> {jobData.employmentType}
          </p>
          <p>
            <FaRupeeSign /> {jobData.packagePerAnnum}
          </p>
        </div>

        <hr />

        <h4>Description</h4>
        <p>{jobData.jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem