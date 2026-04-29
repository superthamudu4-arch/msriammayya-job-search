import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt, FaBriefcase, FaRupeeSign} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobData} = props

  return (
    <Link to={`/jobs/${jobData.id}`} className="link-item">
      <li className="job-card">
        <div className="job-top">
          <img src={jobData.companyLogoUrl} alt="company logo" />
          <div>
            <h3 className="job-title">{jobData.title}</h3>
            <p className="job-rating">
              <FaStar /> {jobData.rating}
            </p>
          </div>
        </div>

        <div className="job-middle">
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

        <hr className="divider" />

        <h4 className="job-desc-title">Description</h4>
        <p className="job-description">{jobData.jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem