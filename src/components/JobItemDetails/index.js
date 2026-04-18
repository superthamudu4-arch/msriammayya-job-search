import {Component} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import {FaStar} from 'react-icons/fa'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
    apiStatus: status.loading,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: status.loading})

    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const res = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    const data = await res.json()

    if (res.ok) {
      this.setState({
        jobDetails: data.job_details,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        similarJobs: data.similar_jobs,
        apiStatus: status.success,
      })
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <TailSpin height={50} width={50} color="#0b69ff" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state

    return (
      <div className="job-details-container">
        <div className="job-card">
          <div className="job-top">
            <img
              src={jobDetails.company_logo_url}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{jobDetails.title}</h1>
              <p className="job-rating">
                <FaStar /> {jobDetails.rating} 
                </p>
            </div>
          </div>

          <div className="job-middle">
            <p className="job-location">{jobDetails.location}</p>
            <p className="job-type">{jobDetails.employment_type}</p>
            <p className="job-salary">{jobDetails.package_per_annum}</p>
          </div>

          <hr className="divider" />

          <div className="description-header">
            <h1 className="section-title">Description</h1>
            <a
              href={jobDetails.company_website_url}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit
            </a>
          </div>

          <p className="job-description">{jobDetails.job_description}</p>

          <h1 className="section-title">Skills</h1>

          <ul className="skills-list">
            {skills.map(each => (
              <li key={each.name} className="skill-item">
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skill-img"
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="section-title">Life at Company</h1>

          <div className="life-section">
            <p className="life-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-img"
            />
          </div>
        </div>

        <h1 className="section-title">Similar Jobs</h1>

        <ul className="similar-list">
          {similarJobs.map(job => (
            <SimilarJobItem key={job.id} jobData={job} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        {apiStatus === status.loading && this.renderLoader()}
        {apiStatus === status.success && this.renderSuccess()}
        {apiStatus === status.failure && this.renderFailure()}
      </>
    )
  }
}

export default JobDetails