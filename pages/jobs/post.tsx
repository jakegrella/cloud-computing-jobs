import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Card, Input } from "../../components";
import { validateForm } from "../../utils/postFormHelpers/validateForm";
import { CheckoutForm } from "../../components/postFormComponents/checkout-form";
import { NewLocationSection } from "../../components/postFormComponents/new-location-section";
import { useStore } from "../../store";
import {
  createPaymentIntent,
  fetchSimilarCompanies,
} from "../../utils/httpRequests";
import { ICompany, ILocation } from "../../types";
import styles from "./jobs-post.module.css";
import { formatLocation } from "../../utils/formatLocation";

export default function PostAJob() {
  const [
    previewJob,
    setPreviewJob,
    stripeState,
    setStripeState,
    showPaymentForm,
    setShowPaymentForm,
    companyLocationOptions,
    setCompanyLocationOptions,
  ] = useStore((state) => [
    state.previewJob,
    state.setPreviewJob,
    state.stripeState,
    state.setStripeState,
    state.showPaymentForm,
    state.setShowPaymentForm,
    state.companyLocationOptions,
    state.setCompanyLocationOptions,
  ]);

  const [showSimilarCompanies, setShowSimilarCompanies] = useState(false);
  const [similarCompanies, setSimilarCompanies] = useState([]);
  const [similarCompanySelected, setSimilarCompanySelected] = useState(false);
  const [selectedSimilarCompany, setSelectedSimilarCompany] = useState<
    ICompany | undefined
  >(undefined);
  const [similarCompanyIncorrect, setSimilarCompanyIncorrect] = useState(false);
  const [disableLinkedFields, setDisableLinkedFields] = useState(false);
  const [displayCompensationInfo, setDisplayCompensationInfo] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const runOnPageLoad = async () => {
      // Create PaymentIntent as soon as the page loads
      const paymentIntent = await createPaymentIntent();
      setStripeState({
        ...stripeState,
        clientSecret: paymentIntent.clientSecret,
      });
    };

    try {
      runOnPageLoad();
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isFormValid = validateForm(previewJob, displayCompensationInfo);

    setFormValid(isFormValid);
  }, [previewJob, displayCompensationInfo]);

  function handleInputChange(e) {
    setPreviewJob({ ...previewJob, [e.target.name]: e.target.value });
  }

  function handleCompanyInputChange(e) {
    setPreviewJob({
      ...previewJob,
      company: { ...previewJob.company, [e.target.name]: e.target.value },
    });
  }

  async function handleCompanyNameBlur(e) {
    if (e.target.value) {
      const response = await fetchSimilarCompanies(e.target.value);

      setSimilarCompanies(response);
      setShowSimilarCompanies(true);
    }
  }

  function handleSimilarCompanyButtonClick(sc: ICompany) {
    setPreviewJob({
      ...previewJob,
      company: {
        id: sc.id,
        name: sc.name,
        username: sc.username,
        mission: sc.mission,
        logo: sc.logo,
        overview: sc.overview,
        twitter: sc.twitter,
      },
      // locations: sc.locations,
    });
    setCompanyLocationOptions(sc.locations);

    setShowSimilarCompanies(false);
    setSimilarCompanySelected(true);
    setSelectedSimilarCompany(sc);
    setDisableLinkedFields(true);
  }

  function handleNoSimilarCompaniesButtonClick() {
    setShowSimilarCompanies(false);
    setSimilarCompanyIncorrect(true);
  }

  function handleUndoLinkingSimilarCompanyButtonClick() {
    setDisableLinkedFields(false);
    setSimilarCompanySelected(false);
    setSelectedSimilarCompany(undefined);
    setShowSimilarCompanies(true);
  }

  function handleUndoNoSimilarCompanyButtonClick() {
    setShowSimilarCompanies(true);
    setSimilarCompanyIncorrect(false);
  }

  function handleCompensationDisplay() {
    // if (!displayCompensationInfo) {
    setPreviewJob({
      ...previewJob,
      payRangeMin: undefined,
      payRangeMax: undefined,
      equityRangeMin: undefined,
      equityRangeMax: undefined,
      payRangeTimeFrame: undefined,
    });
    // }

    setDisplayCompensationInfo(!displayCompensationInfo);
  }

  function handleJobPostingFormSubmit() {
    setShowPaymentForm(true);
    setPreviewJob(previewJob);
  }

  function handleExistingCompanyLocationClick(l: ILocation) {
    const locations = previewJob.locations;

    if (!previewJob.locations.some((el) => el.id === l.id)) {
      locations.push(l);
      setPreviewJob({ ...previewJob, locations: locations });
    } else {
      // else button says selected
      setPreviewJob({
        ...previewJob,
        locations: previewJob.locations.filter(
          (location) => location.id !== l.id
        ),
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Post a Job - Cloud Computing Jobs</title>
        <meta name="description" content="Add a software engineering job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.jobPostingFormContainer}>
        {!showPaymentForm ? (
          <form className={styles.form}>
            <Card>
              <h2>Add a Job</h2>
              <p>
                Add information about the job by going through the form below.
                When you are done, click the Continue to Preview & Payment
                button to preview your posting and pay.
              </p>
            </Card>

            <Card>
              <h2>Company Information</h2>
              <Input
                bordered
                type="text"
                name="name"
                label="Company Name"
                value={previewJob.company.name}
                onChange={handleCompanyInputChange}
                onBlur={handleCompanyNameBlur}
                disabled={disableLinkedFields}
                required={true}
              />

              <div className={styles.similarCompaniesFormSection}>
                {showSimilarCompanies && similarCompanies.length > 0 && (
                  <div>
                    <p>We found these companies with similar names:</p>
                    <div className={styles.similarCompanyContainer}>
                      {similarCompanies &&
                        similarCompanies.map((sc) => (
                          <Card key={sc.id} className={styles.similarCompany}>
                            <div>
                              <h3>{sc.name}</h3>
                              <p>@{sc.username}</p>
                            </div>
                            <Button
                              onClick={() =>
                                handleSimilarCompanyButtonClick(sc)
                              }
                            >
                              Link
                            </Button>
                          </Card>
                        ))}
                    </div>
                    <Button onClick={handleNoSimilarCompaniesButtonClick}>
                      Do Not Link
                    </Button>
                  </div>
                )}
                {/* // user links similar company */}
                {similarCompanySelected && (
                  <div>
                    <p>
                      We have linked your posting to @
                      {selectedSimilarCompany.username}
                    </p>
                    <Button
                      onClick={handleUndoLinkingSimilarCompanyButtonClick}
                    >
                      Undo
                    </Button>
                  </div>
                )}

                {/* // no similar companies after fetch or user declines similar companies */}
                {((!similarCompanies.length && showSimilarCompanies) ||
                  similarCompanyIncorrect) && (
                  <div className={styles.companyUsernameContainer}>
                    <p>
                      {previewJob.company.name} will be added as a new company
                    </p>
                    <Button onClick={handleUndoNoSimilarCompanyButtonClick}>
                      Undo
                    </Button>
                    <Input
                      bordered
                      type="text"
                      name="username"
                      label="Company Username"
                      value={previewJob.company.username}
                      onChange={handleCompanyInputChange}
                      required={true}
                    />
                  </div>
                )}
              </div>

              <Input
                bordered
                type="text"
                name="mission"
                label="Company Mission"
                value={previewJob.company.mission}
                onChange={handleCompanyInputChange}
                required={true}
                disabled={disableLinkedFields}
              />
              <Input
                bordered
                type="text"
                name="logo"
                label="Company Logo"
                value={previewJob.company.logo}
                onChange={handleCompanyInputChange}
                required={true}
                disabled={disableLinkedFields}
              />

              <div>
                <label htmlFor="companyOverview">Company Overview</label>
                <textarea
                  name="overview"
                  rows={4}
                  placeholder="Company Overview"
                  value={previewJob.company.overview}
                  onChange={handleCompanyInputChange}
                  disabled={disableLinkedFields}
                  required
                />
              </div>
            </Card>

            <Card>
              <h2>Job Information</h2>
              <Input
                bordered
                type="text"
                name="title"
                label="Job Title"
                value={previewJob.title}
                onChange={handleInputChange}
                required={true}
              />

              <div>
                <label htmlFor="type">Job Type</label>
                <select
                  id="type"
                  name="type"
                  value={previewJob.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Select Job Type" disabled>
                    Select Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience">Experience Level</label>
                <select
                  id="experience"
                  name="experience"
                  value={previewJob.experience}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Select Experience Level" disabled>
                    Select Experience Level
                  </option>
                  <option value="Senior">Senior</option>
                  <option value="Senior">Entry</option>
                </select>
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Position Description"
                  value={previewJob.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="qualifications">Qualifications</label>
                <textarea
                  name="qualifications"
                  rows={4}
                  placeholder="Qualifications"
                  value={previewJob.qualifications}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="qualifications">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  rows={4}
                  placeholder="Responsibilities"
                  value={previewJob.responsibilities}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                bordered
                type="text"
                name="posting"
                label="Posting Link"
                value={previewJob.posting}
                onChange={handleInputChange}
                required={true}
              />
            </Card>

            <Card>
              <h2>Compensation</h2>
              <div className={styles.compensationCheckbox}>
                <Input
                  bordered
                  type="checkbox"
                  name="salary"
                  onChange={handleCompensationDisplay}
                />
                <label htmlFor="salary">Display Compensation Info</label>
              </div>
              {displayCompensationInfo && (
                <div className={styles.compensationGroup}>
                  <h3>Pay Range</h3>
                  <Input
                    bordered
                    type="text"
                    name="payRangeMin"
                    label="Minimum"
                    value={previewJob.payRangeMin?.toString()}
                    onChange={handleInputChange}
                  />
                  <Input
                    bordered
                    type="text"
                    name="payRangeMax"
                    label="Maximum"
                    value={previewJob.payRangeMax?.toString()}
                    onChange={handleInputChange}
                  />

                  <h3>Equity Range</h3>
                  <Input
                    bordered
                    type="text"
                    name="equityRangeMin"
                    label="Minimum"
                    value={previewJob.equityRangeMin?.toString()}
                    onChange={handleInputChange}
                  />
                  <Input
                    bordered
                    type="text"
                    name="equityRangeMax"
                    label="Maximum"
                    value={previewJob.equityRangeMax?.toString()}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </Card>

            <Card>
              <h2>Locations</h2>
              {similarCompanySelected && (
                <h3>Other locations for {previewJob.company.name}</h3>
              )}
              {companyLocationOptions.map((l: ILocation) => (
                <Card key={l.id} className={styles.companyLocation}>
                  <h2>{l.locality}</h2>
                  <p>{formatLocation(l)}</p>
                  <Button onClick={() => handleExistingCompanyLocationClick(l)}>
                    {previewJob.locations.length &&
                    previewJob.locations.some((el) => el.id === l.id)
                      ? "Selected"
                      : "Select"}
                  </Button>
                </Card>
              ))}

              <NewLocationSection />
            </Card>

            <Button
              type="submit"
              onClick={handleJobPostingFormSubmit}
              disabled={!formValid}
            >
              Continue to Preview & Payment
            </Button>
          </form>
        ) : (
          <CheckoutForm />
        )}
      </div>
    </div>
  );
}
