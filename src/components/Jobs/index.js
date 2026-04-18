import {Component} from 'react'
import Cookies from 'js-cookie'
import { TailSpin } from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import {FaSearch} from 'react-icons/fa'

import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    activeEmploymentTypes: [],
    activeSalaryRange: '',
    apiStatus: status.loading,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: status.loading})

    const {searchInput, activeEmploymentTypes, activeSalaryRange} = this.state
    const employment = activeEmploymentTypes.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${activeSalaryRange}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(apiUrl, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        rating: job.rating,
        location: job.location,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        jobDescription: job.job_description,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: status.success,
      })
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmployment = id => {
    const {activeEmploymentTypes} = this.state

    const updatedList = activeEmploymentTypes.includes(id)
      ? activeEmploymentTypes.filter(each => each !== id)
      : [...activeEmploymentTypes, id]

    this.setState({activeEmploymentTypes: updatedList}, this.getJobs)
  }

  onChangeSalary = id => {
    this.setState({activeSalaryRange: id}, this.getJobs)
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <TailSpin height={50} width={50} color="#0b69ff" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobItem key={job.id} jobData={job} />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case status.loading:
        return this.renderLoader()
      case status.success:
        return this.renderJobsList()
      case status.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <>
        <Header />

        <div className="jobs-container">
          <div className="left-section">
            <Profile />

            <hr />

            <h3>Type of Employment</h3>
            <ul>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    onChange={() =>
                      this.onChangeEmployment(each.employmentTypeId)
                    }
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>

            <hr />

            <h3>Salary Range</h3>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input
                    type="radio"
                    name="salary"
                    id={each.salaryRangeId}
                    onChange={() => this.onChangeSalary(each.salaryRangeId)}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="right-section">
            <div className="search-box">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <FaSearch />
              </button>
            </div>

            {this.renderContent()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
