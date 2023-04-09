import styled from "styled-components";
import { COLORS } from "../../Constants";

const Disclosure = () => {
  return (
    <Wrapper>
      <div>
        <P>Effective Date: April 2023,</P>
        <P>
          This Risk Disclosure Statement (this “Statement”) applies to the
          electronic trading platform (including any applicable mobile
          applications and websites used to access the same) (collectively the
          “Platform”) provided by CryptoBeats Fintech Limited (the “Company”,
          “we”, “us” or “our”), and shall be deemed as part of the Service
          Agreement between the User and the Company (the “Service Agreement”).
          All capitalized terms that are used but not otherwise defined herein
          shall have the meanings ascribed to them in the Service Agreement. In
          acceding to or using the Platform and the Site, you represent and
          warrant that you are fully aware of the risks associated with the
          transactions involving Digital Assets or the use of Platform. You
          agree and understand that you are solely responsible for determining
          the nature, potential value, suitability, and appropriateness of these
          risks for yourself, and that the Company does not give advice or
          recommendations regarding any Digital Asset, including the suitability
          and appropriateness of, and investment strategies for, any Digital
          Asset. You agree and understand that you access and use the Platform
          and the Site at your own risk. This brief statement does not disclose
          all of the risks associated with the Digital Assets and using the
          Platform. You should, therefore, carefully consider whether such use
          is suitable for you in light of your circumstances and financial
          resources. You should be aware that you may sustain a total loss of
          the Digital Assets in your Account, and that under certain market
          conditions, you may find it difficult or impossible to liquidate a
          position.
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

export default Disclosure;
