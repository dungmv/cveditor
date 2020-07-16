import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from '../components/skills/Container'

export default () => {
    return (
    <div className="container px-3 px-lg-5">
        <DndProvider backend={HTML5Backend}>
        <article className="resume-wrapper mx-auto theme-bg-light p-5 mb-5 my-5 shadow-lg">
            <div className="resume-header">
                <div className="row align-items-center">
                    <div className="resume-title col-12 col-md-6 col-lg-8 col-xl-9">
                        <h2 className="resume-name mb-0 text-uppercase" contentEditable={true}>Simon Doe</h2>
                        <div className="resume-tagline mb-3 mb-md-0" contentEditable={true}>Senior Software Engineer</div>
                    </div>
                    <div className="resume-contact col-12 col-md-6 col-lg-4 col-xl-3">
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><i className="fas fa-phone-square fa-fw fa-lg mr-2 "></i><a className="resume-link" href="tel:#">0123 4567 890</a></li>
                            <li className="mb-2"><i className="fas fa-envelope-square fa-fw fa-lg mr-2"></i><a className="resume-link" href="mailto:#">simon.doe@yourwebsite.com</a></li>
                            <li className="mb-2"><i className="fas fa-globe fa-fw fa-lg mr-2"></i><a className="resume-link" href="#">www.yourwebsite.com</a></li>
                            <li className="mb-0"><i className="fas fa-map-marker-alt fa-fw fa-lg mr-2"></i>New York</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="resume-intro py-3">
                <div className="media flex-column flex-md-row align-items-center">
                    <img className="resume-profile-image mb-3 mb-md-0 mr-md-5 ml-md-0 rounded mx-auto" src="/images/resume-profile.png" alt="image" />
                    <div className="media-body text-left">
                        <p className="mb-0" contentEditable={true}>Summarise your career here. <a className="theme-link" href="https://themes.3rdwavemedia.com/resources/sketch-template/resume-sketch-sketch-resume-template-for-software-developers/" target="_blank">You can make a PDF version of your resume using our free Sketch template here</a>. Donec quam felis, ultricies nec, pellentesque eu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.  Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="resume-body">
                <div className="row">
                    <div className="resume-main col-12 col-lg-8 col-xl-9 pr-0 pr-lg-5">
                        <section className="work-section py-3">
                            <h3 className="text-uppercase resume-section-heading mb-4" contentEditable={true}>Work Experiences</h3>
                            <div className="item mb-3">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0" contentEditable={true}>Senior Software Engineer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right" contentEditable={true}>Google | 2019 - Present</div>
                                    
                                </div>
                                <div className="item-content" contentEditable={true}>
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>
                                    <ul className="resume-list">
                                        <li>Lorem ipsum dolor sit amet, consectetuer.</li>
                                        <li>Aenean commodo ligula eget dolor.</li>
                                        <li>Etiam ultricies nisi vel augue.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="item mb-3">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Lead Software Developer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Apple | 2016 - 2019</div>
                                    
                                </div>
                                <div className="item-content">
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel.</p>
                                    <ul className="resume-list">
                                        <li>Lorem ipsum dolor sit amet, consectetuer.</li>
                                        <li>Aenean commodo ligula eget dolor.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="item mb-3">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Software Developer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Dropbox | 2014 - 2016</div>
                                </div>
                                <div className="item-content">
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Developer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Uber | 2013 - 2014</div>
                                    
                                </div>
                                <div className="item-content">
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Backend Developer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Amazon | 2014 - 2016</div>
                                </div>
                                <div className="item-content">
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Frontend Developer</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Startup | 2013 - 2014</div>
                                </div>
                                <div className="item-content">
                                    <p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
                                </div>
                            </div>
                        </section>
                        <section className="project-section py-3">
                            <h3 className="text-uppercase resume-section-heading mb-4">Projects</h3>
                            <div className="item mb-3">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Lorem Ipsum</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Open Source</div>
                                </div>
                                <div className="item-content">
                                    <p>You can use this section for your side projects. You can <a href="#" className="theme-link">provide a project link here</a> as well. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Sed Fringilla</h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Open Source</div>
                                </div>
                                <div className="item-content">
                                    <p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-heading row align-items-center mb-2">
                                    <h4 className="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Praesent </h4>
                                    <div className="item-meta col-12 col-md-6 col-lg-4 text-muted text-left text-md-right">Open Source</div>
                                </div>
                                <div className="item-content">
                                    <p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                            </div>
                        </section>	
                    </div>
                    <aside className="resume-aside col-12 col-lg-4 col-xl-3 px-lg-4 pb-lg-4">
                        <section className="skills-section py-3">
                            <h3 className="text-uppercase resume-section-heading mb-4">Skills</h3>
                            <div className="item">
                                <h4 className="item-title">Technical</h4>
                                {Container([
                                    'JavaScript/Angular/React/Vue',
                                    'Python/Ruby/PHP',
                                    'Node.js/ASP.NET',
                                    'PostgreSQL/MySQL',
                                    'Object-oriented design',
                                    'Design and implement database structures',
                                ])}
                            </div>
                            <div className="item">
                                <h4 className="item-title">Professional</h4>
                                <ul className="list-unstyled resume-skills-list">
                                    <li className="mb-2">Effective communication</li>
                                    <li className="mb-2">Team player</li>
                                    <li className="mb-2">Strong problem solver</li>
                                    <li>Good time management</li>
                                </ul>
                            </div>
                        </section>
                            <section className="education-section py-3">
                                <h3 className="text-uppercase resume-section-heading mb-4">Education</h3>
                                <ul className="list-unstyled resume-education-list">
                                    <li className="mb-3">
                                        <div className="resume-degree font-weight-bold">MSc in Computer Science</div>
                                        <div className="resume-degree-org text-muted">University College London</div>
                                        <div className="resume-degree-time text-muted">2010 - 2011</div>
                                    </li>
                                    <li>
                                        <div className="resume-degree font-weight-bold">BSc Maths and Physics</div>
                                        <div className="resume-degree-org text-muted">Imperial College London</div>
                                        <div className="resume-degree-time text-muted">2007 - 2010</div>
                                    </li>
                                </ul>
                            </section>
                            <section className="education-section py-3">
                                <h3 className="text-uppercase resume-section-heading mb-4">Awards</h3>
                                <ul className="list-unstyled resume-awards-list">
                                    <li className="mb-3">
                                        <div className="font-weight-bold">Award Lorem Ipsum</div>
                                        <div className="text-muted">Microsoft lorem ipsum (2019)</div>
                                    </li>
                                    <li>
                                        <div className="font-weight-bold">Award Donec Sodales</div>
                                        <div className="text-muted">Oracle Aenean (2017)</div>
                                    </li>
                                </ul>
                            </section>
                            <section className="skills-section py-3">
                                <h3 className="text-uppercase resume-section-heading mb-4">Languages</h3>
                                <ul className="list-unstyled resume-lang-list">
                                    <li className="mb-2">English <span className="text-muted">(Native)</span></li>
                                    <li>Spanish <span className="text-muted">(Professional)</span></li>
                                </ul>
                            </section>
                            <section className="skills-section py-3">
                                <h3 className="text-uppercase resume-section-heading mb-4">Interests</h3>
                                <ul className="list-unstyled resume-interests-list mb-0">
                                    <li className="mb-2">Climbing</li>
                                    <li className="mb-2">Snowboarding</li>
                                    <li className="mb-2">Photography</li>
                                    <li>Travelling</li>
                                </ul>
                            </section>
                        </aside>
                    </div>
                </div>
            <hr />
            <div className="resume-footer text-center">
                <ul className="resume-social-list list-inline mx-auto mb-0 d-inline-block text-muted">
                    <li className="list-inline-item mb-lg-0 mr-3"><a className="resume-link" href="#"><i className="fab fa-github-square fa-2x mr-2" data-fa-transform="down-4"></i><span className="d-none d-lg-inline-block text-muted">github.com/username</span></a></li>
                    <li className="list-inline-item mb-lg-0 mr-3"><a className="resume-link" href="#"><i className="fab fa-linkedin fa-2x mr-2" data-fa-transform="down-4"></i><span className="d-none d-lg-inline-block text-muted">linkedin.com/in/username</span></a></li>
                    <li className="list-inline-item mb-lg-0 mr-lg-3"><a className="resume-link" href="#"><i className="fab fa-twitter-square fa-2x mr-2" data-fa-transform="down-4"></i><span className="d-none d-lg-inline-block text-muted">@twittername</span></a></li>
                </ul>
            </div>
        </article>
        </DndProvider>
    </div>
    )
}