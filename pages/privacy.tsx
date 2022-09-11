/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next'

const Privacy = () => (
    <div className="w-full max-w-screen-md my-32 mx-auto">
        <h1>Privacy Notice</h1>
        <span>Updated and Effective as of January 12, 2022</span>
        <p>This privacy policy explains what personal data {process.env.APP_SITE_NAME} collects on you when you participate in {process.env.APP_SITE_NAME} (herein the "app") and how such data is used.</p>
        <p>Should you have any questions or requests regarding the processing of your personal data in relation to the app by us, please send such questions to {process.env.SUPPORT_EMAIL}</p>

        <p>{process.env.APP_SITE_NAME} registers and uses information about you (personal data).</p>

        <p>{process.env.APP_SITE_NAME} is responsible for processing the personal data you provide in connection with your use of {process.env.APP_SITE_NAME} and the Platform. Although {process.env.APP_SITE_NAME} is the data controller, {process.env.APP_SITE_NAME} stores your information with Supabase.</p>

        <p>{process.env.APP_SITE_NAME} will not disclose your infromation to others without your explicit consent except as explicity set out below.</p>

        <p>{process.env.APP_SITE_NAME} protects your data and privacy by taking all relevant measures in accordance with applicable legislation, especially the General Data Protection Regulation (EU) 2016/679 ("GDPR").</p>

        <p>This privacy notice sets out the basis for how we look after your personal data and the privacy rights you are granted by law.</p>

        <h3>Why do we register and use your personal data?</h3>
        <p>We register your data as an intermediary in order for you to be able to receive news and updates in connection with information technology and game development.</p>

        <p>{process.env.APP_SITE_NAME} also uses the information for administrative purposes and to improve the Services {process.env.APP_SITE_NAME} now has and will provide in the future. {process.env.APP_SITE_NAME} may furthermore use information about your input and use {process.env.APP_SITE_NAME} for targeted improvement of {process.env.APP_SITE_NAME}'s services. Finally, {process.env.APP_SITE_NAME} may use your data for statistical purposes.</p>

        <h3>When do we register and use your personal data?</h3>
        <p>We register your personal data when you provide it to {process.env.APP_SITE_NAME}.</p>

        <p>This means we register and use personal data when:</p>
        <ul>
            <li>you have made or you are considering making an agreement with us to make use of a service or product we provide based on article 6(1) of GDPR</li>
            <li>you have granted us consent to use your personal data for a specific purpose based on article 6(1) of GDPR</li>
            <li>you have granted us consent to use your sensitive personal data for a specific purpose based on article 9(2)(a) of GDPR</li>
            <li>it is our legal duty to do</li>
            <li>it is necessary to pursue a legitimate interest of {process.env.APP_SITE_NAME} pursuant to article 6(1)(f) of GDPR. For example, this may be to prevent abuse and loss, to strengthen our IT-solution. We will only do so if our interest clearly outweighs your interest in not having your personal data processed by us.</li>
        </ul>

        <h3>Which personal ddata do we register and use?</h3>
        <p>When you create a user profile at {process.env.APP_SITE_NAME}, {process.env.APP_SITE_NAME} will request a variety of information from you, including your name and email address. This information will either be requested by site form or obtained from a user's associated social media account when using Single Sign On. {process.env.APP_SITE_NAME} uses this information to make the services available to you. You may alway ask {process.env.APP_SITE_NAME} to inform you of which inforation {process.env.APP_SITE_NAME} has registered about you. You may also at any time demand {process.env.APP_SITE_NAME} deletes information registered about you. If it turns out that {process.env.APP_SITE_NAME}' information about you is incorrect, you may request the information about you is updated by {process.env.APP_SITE_NAME}. In order to perform these corrections, it may be necessary to validate a user by their e-mail address.</p>

        <p>Depending on the services or products are interested in, we register and use different kinds of personal data, including:</p>

        <ul>
            <li>basic personal data, e.g. your name and contact information</li>
            <li>data from your Github profile</li>
            <li>data from your Discord profile</li>
            <li>details about the services and products we provide to you, how you use them and your preferences towards them</li>
            <li>we may also register other personal data if needed to provide you with specific products or services or we are required by law to do so</li>
        </ul>

        <h3>How long do we register and use your personal data?</h3>
        <p>We keep your data only for as long as it is needed for the purpose for which your data were registered and used.</p>

        <h3>Third parties that we share your personal data with</h3>
        <p>In some instances, we may share, disclose, or acquire personal data with Google, Twitter, and Panelbear,in order to create accounts and send information to our users in a coordinated way.</p>

        <h3>Profiling and automated decisions</h3>

        <h3>Profiling</h3>
        <p>Profiling is a form of automated processing of your personal data. We use profiling e.g. to be able to offer you specific services and products that meet your preferences.</p>

        <h3>Automated decision-making</h3>
        <p>We do not use automated decision-making in {process.env.APP_SITE_NAME}</p>

        <h3>Insight into your personal data</h3>
        <p>You can obtain insight into the personal data we registered and use, where it comes fro and what we use it for. You can obtain information about for how long we store your data and about who receives data about you. Your right of access may, however, be restricted by legislation, protection of other persons' privacy and consideration for our business and practices. Our know-how, business secrets as well as internal assessments and material may also be exempt from the right of insight.</p>

        <h3>Correction or erasure of your personal data in {process.env.APP_SITE_NAME}</h3>
        <p>If the data is incorrect, incomplete or irrelevant, you are entitled to have the data corrected or erased. These rights are known as the "right to rectification", "right to erasure", or "right to be forgotten" and {process.env.APP_SITE_NAME} provides you with the means to rectify or delete your data.</p>

        <h3>Restriction of use</h3>
        <p>If you believe that the data we have registered about you is incorrect, or if you have objected to the use of the data, you may demand that we restrict the use of this data to storage. Use will only be restricted to storage until the correctness of the data can be established, or it can be checked whether our legitimate interests outweigh your interests.</p>

        <p>If you are entitled to have the data we have registered about you erased, you may instead request us to restrict the use of these data to stroage. If we need to use the data we have registered about you solely to assert a legal claim, you may also demand that other use of these data be restricted to storage. We may, however, be entitled to other use to assert a legal claim or if you have granted your consent to this.</p>

        <h3>Withdrawal of a consent</h3>
        <p>You can withdraw a consent you may have given at any time. For withdrawal of consent please see contact infromation below. Please note that if you withdraw your consent, we may not be able to offer you specific services or products. If you withdraw consent, this will not affect the legitimacy of our processing of your personal data based on your previously given consent and up until the time of withdrawal. Withdrawal of your consent will only become effective from the time of withdrawal.</p>

        <h3>Data portability</h3>
        <p>You have the right to receive the copy of the data you have provided in an electronic machine-readable format.</p>

        <h3>Contact details and Complaints</h3>
        <p>You are always welcome to contact us if you have questions about your privacy rights and how we register and use personal data.</p>

        <p>If you are dissatisfied with how we register and use your personal data, and your dialogue with us has not led to a satisfactory outcome, you can lodge a complaint at {process.env.SUPPORT_EMAIL}.</p>

        <h2>Privacy Statement Cookie Policy</h2>

        <h3>Cookies</h3>
        <p>This privacy statement explains how we at {process.env.APP_SITE_NAME} use the electronic footprints you leave when you visit our website and use our electronic self-service solutions and {process.env.APP_SITE_NAME} apps. The statement also provides information about the individual cookies that you can accept and explains how to accept the use of cookies, how to revoke your acceptance of cookies, how to refuse cookies, and what to do to prevent your browser from using cookies at all.</p>

        <h3>Use of cookies on your websites</h3>
        <p>We use cookies on our websites and in our electronic self-service solutions. A cookie is a small text file used by many websites to track repeated visits by users. As an inactive file, a cookie cannot spread viruses or other harmful programs.</p>

        <p>Cookies cannot be used to identify you personally. You should, however, ready the following information about our self-service solutions.</p>

        <h3>Specific information about cookies in our self-service solutions</h3>
        <p>Our self-service solutions use session cookies to make sure that you navigate on the site and use the solutions and tools presented on the site. This means that you cannot use {process.env.APP_SITE_NAME} apps without session cookies. You cannot disable these cookies while using our self-service solutions, but they will disappear when you log off a solution.</p>

        <h3>Purpose</h3>
        <p>We use cookie information only for ordinary operations and for the compilation of statistics that can be used for purposes such as improving our websites and adjusting user experiences to your needs. We also use a few cookies for marketing purposes. We do not use data from cookies to obtain personal information about you.</p>

        <h3>Accept the use of cookies, revoke your acceptance of cookies or refuse cookies</h3>
        <p>The first time you visit our website, you will see a message box about the use of cookies and the privacy policy. By accepting the use of cookies, we will set a cookie on your computer to remember your acceptance. This cookie makes sure that we do not need to notify you on your next visit.</p>

        <p>If you want to avoid cookies altogether, you must disable cookies in your browser. However, disabling cookies will make it impossible for you to log on or use other functions that require the individual pages to remember your actions.</p>

        <h3>Types of cookies</h3>
        <p>When you visit our website, information is sent to us via cookies. This information includes:</p>

        <ul>
            <li>{process.env.APP_SITE_NAME} pages you looked at and the date and time you looked at them</li>
            <li>the browser you are using</li>
            <li>your screen resolution</li>
            <li>your operating system</li>
        </ul>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Scope</th>
                    <th>Purpose</th>
                    <th>Classification</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CookiesOn</td>
                    <td>Persistent</td>
                    <td>Global</td>
                    <td>To check if cookies have been accepted</td>
                    <td>Cat. 2 - operations</td>
                </tr>
                <tr>
                    <td>HistorySession</td>
                    <td>Session</td>
                    <td>Local</td>
                    <td>User survey</td>
                    <td>Cat. 2 - operations</td>
                </tr>
                <tr>
                    <td>NewsletterCTA</td>
                    <td>Persistent</td>
                    <td>Global</td>
                    <td>To check if the newsletter CTA has been shown</td>
                    <td>Cat. 2 - operations</td>
                </tr>
            </tbody>
        </table>

        <h3>Global and local cookies</h3>
        <p>A global cookie can be set on any page on our website.</p>

        <p>A local cookie is set only on a number of selected pages.</p>

        <p><strong>Session cookies: </strong>These cookies are set when you open your browser and last until you close it again. When you close your browser, the cookies will be deleted automatically.</p>

        <p><strong>Persistent: </strong>These cookies last for a predetermined length of time and remain on your system until they expire or you delete them.</p>

        <h3>Statistic - Panelbear</h3>
        <p>{process.env.APP_SITE_NAME} uses the analytic tool Panelbear to gather and assess information about how visitors use the web site. Panelbear does not use cookies. More information on what data Panelbear gathers can be found on <a href="https://panelbear.com/docs/what-we-collect/" rel="noopener noreferrer" target="_blank">Panelbear</a></p>

        <h3>Authentication - Google</h3>
        <p>Please refer to <a rel="noopener noreferrer" target="_blank" href="https://www.google.co.uk/policies/technologies/partner-sites/">How Google uses information from sites or apps that use our services</a></p>

        <h3>Authentication - Twitter</h3>
        <p>Please refer to <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/en/privacy">How Twitter uses information from sites or apps that use our services</a></p>

        <br />

        <p><strong>Marketing (third-party cookie): </strong>We use these cookies to monitor use across multiple pages. We may use them to build profiles that show searches made or pages visited. Anonymous data may be shared with third parties.</p>

        <p><strong>Improvement of content: </strong>These cookies enable us to show the content that is most relevant to our visitors.</p>

        <h3>Delete cookies</h3>

        <p>All browsers enable you to delete individual or all cookies at once.</p>

        <p>This procedure for how to delete varies from browser to browser. Remember to delete cookies in all the browsers that you are using.</p>

    </div>
)

export default Privacy