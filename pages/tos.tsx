/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next'

const TOS: NextPage = () => (
    <div className="w-full max-w-screen-md my-32 mx-auto">
        <h1>Terms of Use</h1>
        <span>Updated and Effective as of September 11, 2022</span>

        <p>Welcome to the {process.env.APP_SITE_NAME} platform (the "Platform"). {process.env.APP_SITE_NAME} and the Platform is powered and owned by InQuill Live ("InQuill" / "{process.env.APP_SITE_NAME}"). By accessing, browsing or using this Platform, you acknowledge that you have read, understood and agree to be bound by these Terms of Use (the "Terms") as well as the Privacy Notice which sets out the way we manage your personal data (the "Privacy Notice"). If you do not agree to these Terms and the Privacy Notice, you should not use or access this Platform. {process.env.APP_SITE_NAME} reserves the right to revise these Terms at any time by updating this posting. You are encouraged to review these Terms frequently because your use of the Platform after the posting of changes will constitute your acceptance of the changes. When changes are done to the Terms or the Privacy Notice we will send a notice to you of this by e-mail if available. We grant you a personal, limited, non-transferable non-exclusive, license to access and use the Platform. We reserve the right, in our sole discretion and without notice to you, to revise the products and services available on the Platform and to change, suspend or discontinue any aspect of the Platform and we will not be liable to you or to any third party for doing so. We may also impose rules for and limits on use on the use of the Platform or restrict your access to part, or all, of the Platform without notice or penalty if you in our opinion in any way misuse the Platform or we change teh focus of the Platform. Your continued use of the Platform will constitute your acceptance to any such changes.</p>

        "{process.env.APP_SITE_NAME}" as mentioned refers to <a href={process.env.APP_URL}>{process.env.APP_URL}</a>.

        <p>For the time being {process.env.APP_SITE_NAME} offers the below services (the "Services") on the Platform</p>

        <h3>Live Audience Engagement</h3>
        <p>Users of the Platform have the opportunity to engage with live event speakers as an audience. Questions posted by users on this Platform belong solely to the respective user of the Platform. It does not constitute, or form part of, any offer nor should it or any part of it form the basis of, or be relied on in any connection with any contract or commitment whatsoever. The contents of the Platform may not be construed in any way to be binding advice or strictly followed. Whilst reasonable care has been taken to moderate its contents so they are are not untrue, misleading, nor harmful, no representation is made as to its accuracy, completeness or correctness of the information and opinions contained on the Platform and no liability is accepted for any loss arising from your reliance on it. The information and views given on the Platform are subject to change without notice. The Platform is protected by copyright and is being supplied to you solely for your information and may not be reproduced or further distributed to any other person or published (in whole or in part) without permission from {process.env.APP_SITE_NAME}.</p>

        <p>Linked sites: {process.env.APP_SITE_NAME} has not reviewed and is not responsible for the content of off-site pages or any other sites linked to this site.</p>

        <p>No warranty: {process.env.APP_SITE_NAME} accepts no responsibility for, and makes no warranty that functions contained at this site will be uninterrupted or error-free. {process.env.APP_SITE_NAME} does not accept any liability for any direct or consequential loss arising from any use of the Platform or its contents, including any harm or defect caused by your computer as a result of access and use of the server that makes the Platform available.</p>

        <h3>General Terms for use of the Platform</h3>

        <ol>
            <li>You are responsible for your own communications</li>
        </ol>
        <p>You are responsible for your own communications, including the transmission, uploading, or posting of information and are responsible for the consequences of such communications to the Platform.</p>
        <p>We require all Members to agree not to use the Platform, and specfically prohibit any use of the Platform, for any of the following purpose:</p>
        <ol>
            <li>Posting any information which is untrue or inaccurate</li>
            <li>Engaging in conduct that would constitute a criminal offense or give rise to civil liability or otherwise violate any law or regulation</li>
            <li>Attempting to interfere in any way with the Platform's network security, or attempting to use the Platform's service to gain unauthorized access to any other company system</li>
        </ol>
        <p>You are responsible for maintaining the confidentiality of your account. You agree to accept responsibility for all activities that occur under your account.</p>
        <p>You agree to notify us promptly in the event of any unauthorized use of your acccount or other breach of security.</p>

        <ol>
            <li>Registration</li>
        </ol>
        <p>Registration on the Platform is carried out through the use of third-party single sign-on applications through Supabase. During registration, we store the user email and provider in a Supabase database, which we do not share to any further third-parties. The purpose of storing this information is to prevent unfairness and abuse on the Platform through unique accounts. In the case of abuse, we reserve the right to ban or prevent access to users of this Platform who have violated this agreement.</p>

        <ol>
            <li>Use of data</li>
        </ol>
        <p>We refer to our Privacy Notice for you to know how we use data {process.env.PRIVACY_POLICY}. We reserve the right to remove any user content from the Platform if it violates the Terms of Service or is deemed harmful or derogatory to other consumers of the Platform.</p>

        <ol>
            <li>Additional Terms and Conditions</li>
        </ol>
        <p>You agree that additional terms and conditions may apply to specific products, services, or your use of certain portions of the Platform ("Additional Terms"), which Additional Terms form part of thee Terms by reference. If there is a conflict between these terms and the Additional Terms, the Additional Terms shall prevail.</p>


        <ol>
            <li>Product and Serivces Information; Limitations on Access</li>
        </ol>
        <p>Excluding any contents submitted by users from time to time, we strive to ensure that the information on the Platform is complete and reliable. Certain information may contain errors, including pricing errors, typographical errors, and other errors or inaccuracies, which we may correct without liability. We also reserve the right to limit access to portions of the Platform for Members and to revise, suspend, or terminate an event or promotion at any time without notice. We do not guarantee that all products or services described on our Platfor will be available.</p>

        <ol>
            <li>Proprietary Rights</li>
        </ol>
        <p>{process.env.APP_SITE_NAME} is responsible for material published on the Platform. {process.env.APP_SITE_NAME} and its licensors reserve all right to ownership, copyright, trademarks and other intellectual property rights related to {process.env.APP_SITE_NAME} and the Platform and to products and Services mentioned or on the Platform, except as specifically set out in these Terms.</p>

        <p>As a user of this Platform, you may view and print the contents mentioned above for personal non-commercial use only. You may not otherwise copy, save or otherwise reproduce, adapt, modify, transfer, assign, use or exploit the contents or parts thereof without our prior written consent.</p>

        <p>{process.env.APP_SITE_NAME} does not claim ownership of any materials you make available through the Platform. With respect to any materials you submit or make available for inclusion on the Platform, you grant {process.env.APP_SITE_NAME} a perpetual, irrevocable, non-terminable, worldwide, royalty-free and non-exclusive license to use, copy, distribute, publically display, modify and create derivative works of such materials or any part of such materials for use on and in connection with {process.env.APP_SITE_NAME}. You hereby represent that you hold good and proper rights to any material (including, but not limited to, text, images, music, or video) which you provide to {process.env.APP_SITE_NAME} and the Platform. You further represent that any materials you provide will not contain libellous or otherwise unlawful, abusive or obscene material. {process.env.APP_SITE_NAME} will be entitled to use any content submitted by you without incurring obligations of confidentiality, attribution or compensation to you.</p>

        <ol>
            <li>Disclaimers</li>
        </ol>
        <p>You assume all responsibility and risk with respect to your use of the Platform.</p>
        <p>The Platform, and all contents, and other information on or accessible from or through this platform or a "linked" platform are provided on an "as is" and "as available" basis without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, non-infringement, security or accuracy. Specifically, but without limitation, {process.env.APP_SITE_NAME} does not warrant that: (1) The information on this platform is correct, acurate or reliable; (2) The functions contained on this platform will be uninterrupted or error-free; or (3) defects will be corrected, or that this platfor or the server that makes it available is free of viruses or other harmful coponents.</p>

        <p>{process.env.APP_SITE_NAME} makes no warranties of any kind regarding any non-{process.env.APP_SITE_NAME} platforms to which you may be directed or hyperlinked from this Platform. Hyperlinks are included solely for your convenience, and {process.env.APP_SITE_NAME} makes no representations or warranties with regard to the accuracy, availability, suitability or safety of information provided in such non-{process.env.APP_SITE_NAME} platforms. {process.env.APP_SITE_NAME} does not endorse, warrant or guarantee any products or services offered or provided by or on behalf of third parties on the Platform.</p>

        <ol>
            <li>Indemnification</li>
        </ol>
        <p>You agree to indemnify, hold harmless, and defend {process.env.APP_SITE_NAME}, their parents, subsidiaries, divisions, and affiliates, and their respective officers, directors, employees, agents and affiliates from any and all claims, liabilities, damages, costs and expenses of defense, including attorneys' fees, in any way arising from or related to your use of the Platform, your violation of these Terms or the Privacy Policy, content posted to the Platform by you, or your violation of any law or the rights of a third party.</p>

        <ol>
            <li>Limitation of Liability</li>
        </ol>
        <p>In no event shall {process.env.APP_SITE_NAME}, their affiliates or any of their respective officers, directors, employees, agents, successors, subsidaries, suppliers, affiliates, or third parties providing information on this platform by liable to any user of the Platform or any other person or entity for any direct, indirect, special, incidental, punitive, consequential or exemplary damages (including, but not limited to, damages for loss of profits, loss of data, or loss of use) arising out of the use or inability to use the platform, whether based upon warranty, contract, tort, or otherwise, even if {process.env.APP_SITE_NAME} has been advised of or should have known the possibility of such damages or losses. In no event shall the total liability of {process.env.APP_SITE_NAME}, their affiliates or any of their respective officers, directors, employees, agents, successors, subsidiaries, suppliers, affiliates or third parties providing information on this platform to you for all damages, losses, and causes of action resulting from your use of this platform, whether in contract, tort (including, but not limited to, negligence) or otherwise, exceed the amount you paid to {process.env.APP_SITE_NAME} in connection with the event giving rise to such liability.</p>

        <p>You hereby acknowledge that the preceding paragraph shall apply to all content, merchandise and services made available through the Platform.</p>

        <ol>
            <li>International Use</li>
        </ol>
        <p>{process.env.APP_SITE_NAME} is controlled and operated from Finland. We make no representation that materials on the Platform are appropriate for use outside of Finland. If you choose to access this Platform from outside of Finland, you do so at your own initiative and are responsible for compliance with local laws, if and to the extent local laws applicable.</p>

        <ol>
            <li>3rd Party applications</li>
        </ol>
        <p>Within the Platform, there may be links to third party web-platforms, services, or other activities that are not controlled or owned by {process.env.APP_SITE_NAME}. Links to third party Platforms are included as a convenience to users.</p>

        <ol>
            <li>Intellectual Property Rights Infringements; Notice and Take Down Procedures</li>
        </ol>
        <p>If you believe that any material contained on this Platform infringes your copyright or other intellectual property rights, you should notify us of your copyright infringement claim. Notifications of claimed copyright infringement should be sent to the following address: </p>
        <p>{process.env.SUPPORT_EMAIL}</p>

        <ol>
            <li>Platform Security</li>
        </ol>
        <p>Although we believe the Platform to be free from viruses, malware and other errors that might affect your IT systems, you access and use the Platform at your own risk. {process.env.APP_SITE_NAME} assumes no responsibility for any loss or damage arising from the use of the Platform. Furthermore, the {process.env.APP_SITE_NAME} no responsibility for the availability of the Platform.</p>

        <p>Neither {process.env.APP_SITE_NAME} nor any of its officers and employees accept any liability for any damage or direct, indirect or consequential loss arising from the availability or use of the Platform, including any harm or defect caused to your computer as a result of accessing and using the IT systems that makes the Platform available.</p>

        <ol>
            <li>Choice of Law and Jurisdiction</li>
        </ol>
        <p>The laws of the local Platform you sign up to shall govern these terms, without giving effect to any principles that provide for the application of the law of another jurisdiction and any disputes that may occur shall be settled in the courts of the jurisdiction you sign up to. If you sign up at {process.env.APP_URL}, Finnish law and jurisdiction will apply.</p>
    </div>
)

export default TOS