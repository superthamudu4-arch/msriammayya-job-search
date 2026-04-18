import './index.css'

const SimilarJobItem = props => {
  const {jobData} = props

  return (
    <li className="similar-card">
      <div className="similar-top">
        <img
          src={jobData.company_logo_url}
          alt="similar job company logo"
          className="similar-logo"
        />

        <div>
          <h3 className="similar-title">{jobData.title}</h3>
          <p className="similar-rating">⭐ {jobData.rating}</p>
        </div>
      </div>

      <h4 className="similar-desc-title">Description</h4>
      <p className="similar-description">{jobData.job_description}</p>

      <div className="similar-bottom">
        <p className="similar-location">{jobData.location}</p>
        <p className="similar-type">{jobData.employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem