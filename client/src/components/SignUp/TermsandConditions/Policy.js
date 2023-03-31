import styled from "styled-components";
import { COLORS } from "../../Constants";

const Policy = () => {
  return (
    <Wapper>
      <div>
        <H1>EFFECTIVE DATE: April 2023,</H1>
        <P>
          This Privacy Policy (this “Policy”) applies to the trading platform
          (including any applicable mobile applications and websites used to
          access the same) (collectively the “Platform”) provided by CryptoBeats
          Fintech Limited (the “Company,” “we,” “us” or “our”). It describes how
          the Company collects, uses, and discloses Personal Information that we
          obtain from Users of the Platform and any account services provided
          through the Platform, and how we use and disclose that information.
          For purposes of this Policy, “Personal Information” refers to
          information supplied by a User from which the identity of such User
          may be directly or indirectly determined. By registering for and using
          the Platform, you agree that your Personal Information will be handled
          as described in this Policy and the Terms and Conditions applicable to
          the Platform (the “Service Agreement”); capitalized terms used herein
          shall have the same meaning as set forth in the Service Agreement.
        </P>
      </div>
      <Sample>
        <P>To be continued...</P>
      </Sample>
    </Wapper>
  );
};

const P = styled.p`
  color: ${COLORS.white};
`;

const H1 = styled.h1`
  color: ${COLORS.white};
`;

const Wapper = styled.div`
  width: 80%;
`;

const Sample = styled.div`
  margin-top: 30px;
  font-size: 30px;
`;

export default Policy;
