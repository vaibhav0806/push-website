// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable */

// React + Web3 Essentials
import React, { useEffect, useLayoutEffect, useState } from 'react';

// External Components
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import styled from 'styled-components';

// Internal Components
import FadeInAnimation from '@site/src/components/FadeInAnimation';
import HorizontalScroll from '@site/src/components/HorizontalScroll';
import ImageHolder from '@site/src/components/ImageHolder';
import { ReactComponent as BNBChainSVG } from '../assets/BNBChain.svg';
import { ReactComponent as BeInCryptoSVG } from '../assets/BeInCryptoLogo.svg';
import { ReactComponent as BalajiTweethandleBlackSVG } from '../assets/balajitweethandle.svg';
import { ReactComponent as CoindeskBlackSVG } from '../assets/coindesk_black.svg';
import { ReactComponent as DefiPrimeBlackSVG } from '../assets/defiprime.svg';
import { ReactComponent as DiscordSVG } from '../assets/discord.svg';
import { ReactComponent as EthFoundationBlackSVG } from '../assets/eth_foundation_black.svg';
import { ReactComponent as EthLogoTextSVG } from '../assets/ethereum-logo-landscape.svg';
import { ReactComponent as CensorshipresistantFigure } from '../assets/figures/censorshipresistant.svg';
import { ReactComponent as ChainAgnosticFigure } from '../assets/figures/chainagnostic.svg';
import { ReactComponent as DecentralizedstackFigure } from '../assets/figures/decentralizedstack.svg';
import GrowWithPushFigure from '../assets/figures/growwithpush.webp';
import { ReactComponent as ImmediatecommunicationFigure } from '../assets/figures/immediatecommunication.svg';
import { ReactComponent as ImproveduxFigure } from '../assets/figures/improvedux.svg';
import PushMissingPieceFigure from '../assets/figures/push-missingtest.webp';
import { ReactComponent as SecurityalertsFigure } from '../assets/figures/securityalerts.svg';
import { ReactComponent as GithubSVG } from '../assets/github.svg';
import { ReactComponent as PolygonLogoTextSVG } from '../assets/polygon_logo_text_black.svg';
import { ReactComponent as TwitterSVG } from '../assets/twitter.svg';
import AnalyticsStats from '../components/AnalyticsStats';
import Blogs from '../components/Blogs';
import HybridSection from '../components/HybridSection';
import InvestorList from '../components/InvestorList';
import MarqueeAnimation from '../components/MarqueeAnimation';
import PageWrapper from '../components/PageWrapper';
import PartnerChannels from '../components/PartnerChannels';
import { Atag, ContentV2, H1V2, H2V2, ItemHV2, ItemVV2, SectionV2, SpanV2 } from '../components/SharedStylingV2';
import SignupInput from '../components/SignupInput';
import useMediaQuery from '../hooks/useMediaQuery';

// Internal Configs
import GLOBALS, { device } from '../config/globals';
import PageMeta from '../config/pageMeta';
import TeamList from '../config/teamList';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home(): JSX.Element {
  // Internationalization
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery(device.laptop);
  const isLargeScreen = useMediaQuery('(max-width: 1250px)');


  // Hero Shrink Animation
  useLayoutEffect(() => {
    gsap.to('#herobg', {
      scrollTrigger: {
        trigger: '#herobg',
        start: 'center center',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
      scale: 0.985,
      borderRadius: GLOBALS.ADJUSTMENTS.RADIUS.LARGE,
    });

    gsap.to('#integratePush', {
      scrollTrigger: {
        trigger: '#newone',
        start: 'center top',
        end: '+=500',
        scrub: true,
        markers: false,
      },
      scale: 0.985,
      borderRadius: GLOBALS.ADJUSTMENTS.RADIUS.LARGE,
    });
  }, []);

  const [showMoreTeamMembers, setShowMoreTeamMembers] = useState(false);

  const onClickViewMoreTeamMembers = (e) => {
    e.preventDefault();
    setShowMoreTeamMembers(!showMoreTeamMembers);
  };

  return (
    <PageWrapper
      pageName={PageMeta.HOME.pageName}
      pageTitle={PageMeta.HOME.pageTitle}
    >
      <HomeWrapper>
        {/* HERO SECTION */}
        <SectionV2
          id="hero"
          minHeight={`calc(100vh + ${GLOBALS.ADJUSTMENTS.RADIUS.LARGE})`}
          background={GLOBALS.COLORS.BG_LIGHT}
          width="100%"
          overflow="hidden"
          className="darkBackground"
        >
          <ItemVV2
            // id="herobg"
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            background={GLOBALS.COLORS.BG_DARK}
            borderRadius={`0 0 ${GLOBALS.ADJUSTMENTS.RADIUS.LARGE} ${GLOBALS.ADJUSTMENTS.RADIUS.LARGE}`}
          />

          <ContentV2
            alignSelf="center"
          >
            {
              // rendering the main animation only on large laptops and desktops
              !isMobile && (
                <HeroAnimation>
                  <Spline scene="https://prod.spline.design/vhrszmXNdAbcAHQW/scene.splinecode" />
                </HeroAnimation>
              )
            }
            <HeroPrimary
                flex="initial"
                justifyContent="flex-start"
              >
                <HeroItem
                  maxWidth="50%"
                  alignItems="flex-start"
                  MarginTop={'100px'}
                >
                  <FadeInAnimation
                    wrapperElement="div"
                    delay={0.25}
                  >
                    <H1V2 zIndex="2">{t('home.hero.title')}</H1V2>
                  </FadeInAnimation>
                </HeroItem>
            </HeroPrimary>
          </ContentV2>
        </SectionV2>

        
      </HomeWrapper>
    </PageWrapper>
  );
}

/**
 * V2 Design
 */
const HeroPrimary = styled(ItemHV2)`
  margin: 120px 0;

  @media ${device.laptop} {
    margin: 80px 0;
  }

  @media ${device.mobileM} {
    margin: 80px 0;
  }
`;

const MemberImage = styled(ImageHolder)``;

const HeroAnimation = styled(ItemHV2)`
  position: absolute;
  top: 0;
  left: 380px;
  right: auto;
  bottom: 150px;
  width: 100%;
  z-index: 1;
`;

const HeroItem = styled(ItemVV2)`
  @media ${device.laptop} {
    max-width: initial;
    margin-top: ${(props) => props.MarginTop || '0px'};
  }

  @media ${device.mobileM} {
    max-width: initial;
  }
`;

const HeroCTA = styled(ItemHV2)`
  @media ${device.mobileM} {
    &.Button {
      display: none;
    }
  }
`;

const AnalyticsStatsContainer = styled(ItemHV2)`
  @media ${device.laptop} {
    flex: initial;
    position: relative;
    bottom: auto;
    margin: 30px;
  }
`;

/**
 * Responsive Styled Components for Shared Styling
 */

const ResponsiveSection = styled(HybridSection)`
  @media ${device.tablet} {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
  @media (max-width: 380px) {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
`;

const ResponsiveH2 = styled(H2V2)`
  @media ${device.tablet} {
    font-size: 32px;
  }
`;

const HomeWrapper = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  & #hero .contentBox {
    row-gap: 18px;
  }

  & .pushMissingSvg {
    width: 500px;
    @media ${device.laptop} {
      width: 400px;
    }
    @media ${device.tablet} {
      width: 100%;
    }
  }
  @media ${device.tablet} {
    width: 100%;

    & svg.figureSvg {
      width: 100%;
    }
  }
`;

/**
 * Home Page Sections
 */

const HeroSection = styled(ResponsiveSection)`
  padding: 0px 160px 0px 160px;
`;

const StorySection = styled(ResponsiveSection)`
  padding: 0px 160px 80px 160px;

  @media ${device.tablet} {
    padding-bottom: 32px;
  }
`;

const BuildWithPushSection = styled(ResponsiveSection)`
  padding: 0px 160px 80px 160px;

  @media ${device.tablet} {
    padding: 0px 0px 10px 0px;
  }
`;

const IntergrateWithPushSection = styled(ResponsiveSection)`
  padding: 80px 160px 180px 160px;
`;

const ItemImage = styled(ItemVV2)`
  width: 100%;
  @media ${device.tablet} {
    width: 400px;
    margin: 0 auto;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

const FeaturedInSection = styled(ResponsiveSection)`
  padding: 0;
  min-height: auto;

  & .contentBox {
    gap: 80px;
    flex: 0;
    padding-top: 0;
    margin-top: 60px;
    // margin-top: 160px;
  }
`;

const FeaturedInMarquee = styled(ItemHV2)``;

const ResponsiveHeroContent = styled(ItemHV2)`
  @media ${device.tablet} {
    flex-direction: column;
    margin-top: 240px;
  }
`;

const HeroBox = styled(ItemVV2)`
  flex: 0 0 52%;

  @media ${device.tablet} {
    flex: 1;

    & span {
      font-weight: 400;
      font-size: 18px;
    }
  }
`;

const PushWorksRow = styled(ItemHV2)`
  // column-gap: 105px;
  column-gap: 40px;
  margin-top: 150px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: row;

  @media ${device.tablet} {
    flex-direction: column;
    row-gap: 30px;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  @media ${device.mobileL} {
    row-gap: 30px;
    flex-direction: column;
    margin-top: 80px;
    margin-bottom: 80px;
  }
`;

const PoweringCommunicationRow = styled(ItemHV2)`
  margin: 80px 0 50px 0;

  @media ${device.tablet} {
    margin-top: 80px;
  }
`;

const LiveNetworks = styled(ItemHV2)`
  background: #ffffff;
  border: 1px solid #bac4d6;
  border-radius: 28px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: space-between;
  box-sizing: border-box;

  & .divider {
    background: #bac4d6;
    flex: 0 0 1px;
  }

  & .network {
    padding: 26px 16px;

    & svg {
      width: 106px;
      height: 26px;
    }
  }
}

  

  @media ${device.laptopL} {
    flex-direction: row;
    flex-wrap: nowrap;
    border-radius: 18px;

    & .network {
      padding: 26px 16px;

      & svg {
        width: 106px;
        height: 26px;
      }
    }
  }

  @media ${device.mobileL} {
    flex-direction: row;
    flex-wrap: nowrap;
    border-radius: 18px;

    & .network {
      padding: 15px 10px;

      & svg {
        width: 79.5px;
        height: 19.5px;
      }
    }
  }
`;

export const BodyContent = styled.div`
	// display: flex;
	// flex-direction: column;
	padding: ${(props) => props.padding || '40px 0px'};
	// position: relative;

	&.contentBox {
	// 	width: 100%;
  //   align-self: center;
    max-width: 1213px;
  //   flex: 1;
  //   display: flex;
	// }

  @media ${device.tablet} {
  	padding: ${(props) => props.padding || '10px 0px'};
  }
`;

const Partners = styled(ItemVV2)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const SignupBox = styled(ItemHV2)`
  background: #b9abef;
  backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 72px;
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media ${device.tablet} {
    padding: 24px;
    flex-direction: column;
  }
`;

const GrowPushCard = styled(ItemVV2)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 32px;
  padding: 60px 80px;
  width: 45%;

  background: ${(props) => props.background || '#FFFBFB'};
  border-radius: 48px;

  & .figureSvg {
    width: 100%;
    height: 227px;

    @media ${device.tablet} {
      width: 100%;
    }
  }

  @media ${device.tablet} {
    padding: 28px;
    border-radius: 36px;
  }
`;

const GrowPushCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const IntegrateGrowWithPushRow = styled(ItemHV2)`
  margin: 40px 0 0 0;
  padding: 0 160px 0 160px;

  & svg.figureSvg {
    width: 100%;
  }

  @media ${device.tablet} {
    padding-left: 30px;
    padding-right: 30px;
    margin: 0;

    & svg.figureSvg {
      height: 180px;
    }

    & .growWithPushtext {
      text-align: center;
    }
  }
`;

const IntegrateAndEarn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  text-align: center;
  background: rgba(235, 216, 249, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 32px;
  padding: 60px 300px;

  @media ${device.tablet} {
    padding: 32px 36px;
  }
`;

const Matrix = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #000;
`;

const MatrixCell = styled.div`
  display: flex;
  padding: 42px 0 32px 32px;
  flex-direction: column;
  flex-basis: 33.33%;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  box-sizing: border-box;
  position: relative;
  color: #000;
  row-gap: 24px;

  justify-content: space-between;
  flex-direction: column;

  & .matrixFigure {
    display: flex;
    height: 72px;
    align-items: center;
  }

  &:nth-child(3) {
    border-right: 0;
  }

  &:nth-child(6) {
    border-right: 0;
  }

  &::before {
    position: absolute;
    z-index: 1;
    content: '';
    top: -1px;
    left: 0;
    height: 8px;
    width: 96px;
    background: #dd44b9;
  }

  @media ${device.tablet} {
    flex-basis: 50%;
    padding: 16px 12px;
    row-gap: 16px;

    &:nth-child(2) {
      border-right: 0;
    }

    &:nth-child(4) {
      border-right: 0;
    }

    &:nth-child(3) {
      border-right: 1px solid #000;
    }

    &:nth-child(6) {
      border-right: 0;
    }

    & span {
      font-size: 20px;
    }

    & .matrixFigure {
      margin-top: 8px;
    }
  }
`;

const WhyPushTextBox = styled(ItemHV2)`
  margin: 80px 160px;

  @media ${device.tablet} {
    margin: 50px 0;

    & span {
      text-align: center;
      font-size: 16px;
      line-height: 160%;
    }
  }
`;

const BuiltByIntro = styled(ItemHV2)`
  margin: 120px 160px;

  @media ${device.tablet} {
    margin: 40px 0;
  }
`;

const FeaturedCell = styled.div`
  width: 568px;
  height: 224px;

  padding: 48px 32px;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 30px;

  flex-basis: 100%;

  border: 1px solid #fff;
  border-left: 0;
  color: '#FFF';

  &::before {
    position: absolute;
    z-index: 1;
    content: '';
    top: -1px;
    left: 0;
    height: 8px;
    width: 96px;
    background: #dd44b9;
  }

  &:hover {
    background: linear-gradient(251.72deg, #dd44b9 14.29%, #8b6fd9 86.35%);

    &::before {
      background: #ffffff;
    }

    & a {
      color: #fff;
    }
  }
`;

const ArticleSource = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BuiltByCards = styled(ItemHV2)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 26px;

  transition: all 350ms linear;
`;

const TeamMemberButtons = styled(ItemHV2)`
  @media ${device.tablet} {
    & a {
      width: 100%;
    }
  }
`;

const InvestorHeader = styled(ResponsiveH2)`
  flex-direction: column;
  width: 60%;

  @media ${device.tablet} {
    width: 100%;
    text-align: center;
  }
`;