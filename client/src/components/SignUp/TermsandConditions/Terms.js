import styled from "styled-components";
import { COLORS } from "../../Constants";

const Terms = () => {
  return (
    <Wrapper>
      <div>
        <P>Effective Date: April 2023,</P>
        <P>
          2023 These Terms and Conditions (the “Terms” or this “Agreement”)
          govern the use of the electronic trading platform, including any
          website or mobile application (the “App”, together with the website,
          the “Site”) for accessing the platform, and any services provided
          through the platform (collectively, the “Platform”) provided by
          CryptoBeats Fintech Limited (the “Company”, “we”, “us” or “our”). The
          Terms form a binding agreement between the Company and you, as an
          individual user (“you”, “your” or “User”) for your individual usage of
          the App and Platform. By registering for and downloading the App and
          using the Platform, you confirm your acceptance of this Agreement and
          our associated Privacy Policy. If you do not agree to these Terms, you
          must immediately uninstall the App and cease using the App and the
          Platform. Securities Disclaimer: No material or any other information
          which may be made available on the Site or Platform shall constitute
          or be construed as a recommendation, endorsement, offer, invitation or
          solicitation to enter into any transaction with or purchase any
          product, or otherwise deal with securities, crypto assets or other
          products. You further understand that none of the information
          providers, including any Third-Party Providers (as defined below) are
          advising you personally concerning the nature, potential, value or
          suitability of any particular security or crypto asset, portfolio of
          securities or crypto assets, transaction, investment strategy or other
          matter, and any information provided is not tailored to the investment
          needs of any specific person. You understand that an investment in any
          security or crypto asset is subject to a number of risks, and that
          discussions of any security or crypto asset published on the Site or
          Platform may not contain a list or description of relevant risk
          factors. Please note that markets change continuously, so any
          information, content, Third-Party Content (as defined below) or other
          material provided on or through the Site or Platform may not be
          complete or current, or may be superseded by more current information.
          You rely on such information at your own risk. No Professional or
          Investment Advice. Our Site and Platform are not intended to provide
          tax, legal, insurance or investment advice, and nothing on the Site or
          Platform should be construed as an offer to sell, a solicitation of an
          offer to buy, or a recommendation for any security or crypto asset by
          the Company. You alone are solely responsible for determining whether
          any investment, security or strategy, or any other product or service,
          is appropriate or suitable for you based on your investment objectives
          and personal and financial situation. You should consult an attorney
          or tax professional regarding your specific legal or tax situation.
        </P>
      </div>
      <Sample>
        <P>To be continued...</P>
      </Sample>
    </Wrapper>
  );
};

const P = styled.p`
  color: ${COLORS.white};
`;

const Wrapper = styled.div`
  width: 80%;
`;

const Sample = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;

export default Terms;
