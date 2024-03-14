// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable */

// React + Web3 Essentials
import React, { useEffect, useState } from 'react';

// External Components
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Internal Components
import { Alert } from '@site/src/components/Alert';
import { A, Button, Content,H2 ,H3 ,Image, ItemH, ItemV, LinkTo, Section, Span } from '@site/src/css/SharedStyling';
import useMediaQuery from '@site/src/hooks/useMediaQuery';

// Import Assets
import { AiOutlineClose } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';

// Internal Configs
import GLOBALS, { device } from '@site/src/config/globals';
import { SupportedLanguagesList } from '@site/src/config/SupportedLanguagesList';
import { HeaderList } from '../config/HeaderList';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let lastScrollY = 0;
const SCROLL_DELTA = 5;

if (typeof window !== 'undefined') {
  lastScrollY = window.scrollY;
}

function useScrollDirection(mobileMenuActive: unknown) {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [bkg, setBkg] = useState('dark');

  useEffect(() => {
    const updateScrollDirection = () => {
      let scrollY = 0;

      if (typeof window !== 'undefined') {
        scrollY = window.scrollY;
      }

      let direction = scrollY > lastScrollY ? 'scrollDown' : 'scrollUp';

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > SCROLL_DELTA || scrollY - lastScrollY < -SCROLL_DELTA)
      ) {
        // check if isMobileMenuOpen then override
        if (mobileMenuActive) {
          direction = 'scrollUp';
        }

        setScrollDirection(direction);
      }

      // hacky way, optimize later when time
      // if (scrollY > 970) {
      //   setBkg('light');
      // } else {
      //   setBkg('dark');
      // }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    // add event listener
    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection, mobileMenuActive]);

  return [scrollDirection, bkg];
}

const defaultMobileMenuState = {
  0: false,
  1: false,
  2: false,
  3: false,
  // add next [index]: false for new main Nav menu item
};

function Header() {
  const isMobile = useMediaQuery(device.laptop);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, bkg] = useScrollDirection(isMobileMenuOpen);
  const [mobileMenuMap, setMobileMenuMap] = useState(defaultMobileMenuState);


  // const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Internationalization
  const { t, i18n } = useTranslation();

  const showMobileMenu = isMobile && isMobileMenuOpen;

  // if mobile view then show only DARK header.
  // console.log(bkg);
  const headerClass = `${scrollDirection === 'scrollDown' ? 'hide' : 'show'}`;
  const themeClass = `${bkg}`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((lastOpen) => !lastOpen);
  };

  const onMobileHeaderMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, menuIndex: number) => {
    e.preventDefault();

    // if (isMobile) {
    setMobileMenuMap((oldMap) => {
      return {
        ...defaultMobileMenuState,
        [menuIndex]: !oldMap[menuIndex],
      };
    });
    // }
  };


  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      // Cleanup: Reset overflow when the component unmounts
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMobile]);
  

  const HeaderSpace = ({item, index}) => {
    const openLink = (e, href, id) => {
      e.persist();
      e.stopPropagation();


      if(href) {
        window.open(href, "_blank");
      }
      else if(id) {
        if (showMobileMenu) toggleMobileMenu();

        gsap.to(window, {
          duration: 0.75,
          scrollTo: { y: `#${id}` },
        });
      }
      else return;
    };
    return(
      <HeaderItem 
        onClick={(e)=> openLink(e, item.href, item.id)}>
          {item.srcrefoff && (<HeaderImage
            key={index}
            src={require(`@site/static/assets/website/header/${item.srcrefoff}.png`).default}
            srcSet={`${require(`@site/static/assets/website/header/${item.srcrefoff}@2x.png`).default} 2x, ${require(`@site/static/assets/website/header/${item.srcrefoff}@3x.png`).default} 3x`}
            alt={`${item?.title}`}
            height={24}
            width={24}
          />)}

          <ItemH flexDirection="column" alignItems="flex-start" gap="4px">
            <H2 fontSize='16px' fontFamily='FK Grotesk Neue' color="#FFF" lineHeight="130%" letterSpacing="normal" fontWeight="500">
              {t(item.title)}

              {item.tagitem && <TagItem style={{marginLeft: "10px"}}>{item.tagitem.text}</TagItem>}
            </H2>

            <H3 fontSize='14px' fontFamily='FK Grotesk Neue' color="#BBBCD0" lineHeight="130%" letterSpacing="normal" fontWeight="400">
              {t(item.subtitle)}
            </H3>
          </ItemH>
          </HeaderItem>)
          }

    const textIds = ['text0','text1', 'text2', 'text3', 'text4'];

    const handleMouseEnter = (e,activeId) => {

      textIds.forEach((id) => {
        if (id !== activeId) {
          const element = document.getElementById(id);
          if (element) {
            element.style.color = '#6C6C6C';
            element.style.transitionDuration = '1s';
          }

        }
      });
    };

    const handleMouseLeave = (e) => {

      textIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.style.color = '#fff';
          element.style.transitionDuration = '1s';
        }
      });
    };

  return (
    <StyledHeader
      showMobileMenu={showMobileMenu}
      className={`header ${headerClass}`}
    >

      
      {/* ALERT SECTION */}
      <Alert />

      <Section>
        <Content
          padding="0"
        >
          {/* Header Content Begins */}
          <HeaderItemH
            alignSelf="stretch"
            padding={GLOBALS.ADJUSTMENTS.PADDING.SMALL}
            borderRadius={GLOBALS.ADJUSTMENTS.RADIUS.MID}
          >
            <HeaderBlurV
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              overflow="hidden"
              borderRadius={GLOBALS.ADJUSTMENTS.RADIUS.MID}
              className={'headerblur'}
            />

            <MenuTop flex="initial" showMobileMenu={showMobileMenu}>
              <PushLogoBlackContainer
                className="headerlogo"
                flex="initial"
              >
                <LinkTo
                  to="/"
                  aria-label="Push"
                >
                  <Image
                    src={require(`@site/static/assets/website/segments/PushLogoTextBlack.webp`).default}
                    srcSet={`${require(`@site/static/assets/website/segments/PushLogoTextBlack@2x.webp`).default} 2x, ${require(`@site/static/assets/website/segments/PushLogoTextBlack@3x.webp`).default} 3x`}
                    alt={`Push Logo`}
                    width="auto"
                    height="auto"
                  />
                </LinkTo>
              </PushLogoBlackContainer>
              <PushLogoWhiteContainer
                className="headerlogo"
                flex="initial"
              >
                <LinkTo
                  to="/"
                  aria-label="Push"
                  hoverBackground="transparent"
                  padding="0"
                >
                  <Image
                    src={require(`@site/static/assets/website/header/Push-Logo.png`).default}
                    srcSet={`${require(`@site/static/assets/website/header/Push-Logo@2x.png`).default} 2x, ${require(`@site/static/assets/website/header/Push-Logo@3x.png`).default} 3x`}
                    alt={`Push Logo`}
                    width="auto"
                    height="40px"
                  />
                </LinkTo>
              </PushLogoWhiteContainer>

              <MobileMenuToggleIcon>
                {isMobileMenuOpen ? (
                  <AiOutlineClose
                    size={28}
                    onClick={toggleMobileMenu}
                  />
                ) : (
                  <Image
                    src={require(`@site/static/assets/website/header/bars.png`).default}
                    srcSet={`${require(`@site/static/assets/website/header/bars@2x.png`).default} 2x, ${require(`@site/static/assets/website/header/bars@3x.png`).default} 3x`}
                    alt={`Bars Icon`}
                    width="auto"
                    height="28px"
                    onClick={toggleMobileMenu}
                  />
                )}
              </MobileMenuToggleIcon>
            </MenuTop>

            <HeaderNavItemV showMobileMenu={isMobileMenuOpen}>
              <NavigationMenu
                role="menu"
                className="navigationMenu"
                showMobileMenu={isMobileMenuOpen}
              >
                <NavigationMenuItem>
                  <NavigationMenuHeader
                    onClick={(e) => onMobileHeaderMenuClick(e, 0)}
                    expanded={mobileMenuMap[0]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text0')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    id='text0'
                  >
                    <Span
                      fontSize="18px"
                      fontWeight="500"
                      letterSpacing="-0.03em"
                      lineHeight="142%"
                      padding="16px"
                      color='inherit'
                    >
                      {t('header.products.title')}
                    </Span>
                    <BsChevronDown
                      size={12}
                      className="chevronIcon"
                    />
                  </NavigationMenuHeader>

                  <NavigationMenuContent
                    className="menuContent"
                    expanded={mobileMenuMap[0]}
                  >
                    {HeaderList.products.map((item, index) => 
                    <HeaderSpace item={item} index={index} />)}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuHeader
                    onClick={(e) => onMobileHeaderMenuClick(e, 1)}
                    expanded={mobileMenuMap[1]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text1')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    id='text1'
                  >
                    <Span
                      fontSize="18px"
                      fontWeight="500"
                      letterSpacing="-0.03em"
                      lineHeight="142%"
                      padding="16px"
                      color='inherit'
                    >
                      {t('header.developers.title')}
                    </Span>

                    <BsChevronDown
                      size={12}
                      className="chevronIcon"
                    />
                  </NavigationMenuHeader>

                  <NavigationMenuContent
                    className="menuContent"
                    expanded={mobileMenuMap[1]}
                  >
                    <HeaderDiv>
                      <HeaderSection>
                        {HeaderList.developers.slice(0,4).map((item, index) => 
                          <HeaderSpace item={item} index={index} />)}
                        </HeaderSection>

                        <HeaderSection>
                        {HeaderList.developers.slice(4,7).map((item, index) => 
                          <HeaderSpace item={item} index={`divide-${index}`} />)}
                        </HeaderSection>
                    </HeaderDiv>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuHeader
                    onClick={(e) => onMobileHeaderMenuClick(e, 2)}
                    expanded={mobileMenuMap[2]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text2')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    id='text2'
                  >
                    <Span
                      fontSize="18px"
                      fontWeight="500"
                      letterSpacing="-0.03em"
                      lineHeight="142%"
                      padding="16px"
                      color='inherit'
                    >
                      {t('header.community.title')}
                    </Span>
                    <BsChevronDown
                      size={12}
                      className="chevronIcon"
                    />
                  </NavigationMenuHeader>

                  <NavigationMenuContent
                    className="menuContent"
                    expanded={mobileMenuMap[2]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text1')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >
                    {HeaderList.community.map((item, index) => 
                    <HeaderSpace item={item} index={index} />)}
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuHeader
                    onClick={(e) => onMobileHeaderMenuClick(e, 3)}
                    expanded={mobileMenuMap[3]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text3')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    id='text3'
                  >
                    <Span
                      fontSize="18px"
                      fontWeight="500"
                      letterSpacing="-0.03em"
                      lineHeight="142%"
                      padding="16px"
                    >
                      {t('header.resources.title')}
                    </Span>

                    <BsChevronDown
                      size={12}
                      className="chevronIcon"
                    />
                  </NavigationMenuHeader>

                  <NavigationMenuContent
                    className="menuContent"
                    expanded={mobileMenuMap[3]}
                  >
                    {HeaderList.resources.map((item, index) => 
                    <HeaderSpace item={item} index={index} />)}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </HeaderNavItemV>

            <HeaderFocusItems
              flex="initial"
            >
              <LanguageItem showMobileMenu={showMobileMenu}>
                <LanguageMenuItem>
                  <LanguageMenuHeader
                    onClick={(e) => onMobileHeaderMenuClick(e, 4)}
                    expanded={mobileMenuMap[4]}
                    onMouseEnter={(e) => handleMouseEnter(e,'text4')}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                    id='text4'
                  >
                    <H2 fontSize='16px' fontFamily='FK Grotesk Neue'lineHeight="130%" letterSpacing="normal" fontWeight="500">
                      {isMobile && i18n &&
                        SupportedLanguagesList
                          .filter((item) => item.id === i18n.language)
                          .map((item, index) => 
                              <div>
                                  {item?.language}
                              </div>
                        )
                      }
                    </H2>
                    
                    <Span
                      fontSize="18px"
                      fontWeight="500"
                      letterSpacing="-0.03em"
                      lineHeight="142%"
                      padding="16px 0px"
                    > 
                              <Image
                                src={require(`@site/static/assets/website/languages/eng.png`).default}
                                srcSet={`${require(`@site/static/assets/website/languages/eng@2x.png`).default} 2x, ${require(`@site/static/assets/website/languages/eng@3x.png`).default} 3x`}
                                alt={'Language Header Icon'}
                                height={24}
                                width={24}
                                borderRadius="100%"
                              />
                    </Span>
                    <BsChevronDown
                      size={12}
                      className="chevronIcon"
                    />
                  </LanguageMenuHeader>


                  <LanguageMenuContent
                    className="menuContent"
                    expanded={mobileMenuMap[4]}
                  >
                    {
                      SupportedLanguagesList.map((item, index) => {
                        return (
                          <LanguageButton
                            key={index}
                            href="#"
                            title={t(item.translatedtitle)}
                            background="transparent"
                            hoverbackground="#fff"
                            color="#fff"
                            padding="8px 14px"
                            display="flex"
                            borderRadius="0"
                            justifyContent="flex-start"
                            onClick={() => i18n.changeLanguage(item.id)}
                          >
                            <ItemH
                              justifyContent="flex-start"
                              flexWrap="nowrap"
                              padding="0px"
                            >
                              <Image
                                key={index}
                                src={require(`@site/static/assets/website/languages/${item.srcref}.png`).default}
                                srcSet={`${require(`@site/static/assets/website/languages/${item.srcref}@2x.png`).default} 2x, ${require(`@site/static/assets/website/languages/${item.srcref}@3x.png`).default} 3x`}
                                alt={`${item?.alt}`}
                                height={24}
                                width={24}
                                borderRadius="100%"
                              />
                              <H3
                                fontSize="14px"
                                fontWeight="500"
                                lineHeight="130%"
                                letterSpacing="normal"
                                alignSelf="flex-start"
                                padding="8px 30px 8px 10px !important"
                                color="#FFF !important"
                                fontFamily = "FK Grotesk Neue"
                              >
                                {t(item.translatedtitle)}
                              </H3>
                            </ItemH>
                          </LanguageButton>
                        )
                      })
                    }
                  </LanguageMenuContent>
                </LanguageMenuItem>
              </LanguageItem>

              <DappLauncher
                showMobileMenu={showMobileMenu}
                className="launchDappBtn"
                href="https://app.push.org/"
                target="_blank"
                title={t('header.app-button.alt-title')}
                background="#DD44B9"
                borderRadius="12px"
                fontSize="15px"
                fontWeight="500"
                letterSpacing="-0.03em"
                lineHeight="normal"
                width="100%"
                // margin="0px 8px 0px 0px"
              >
                {t('header.app-button.title')}
              </DappLauncher>
            </HeaderFocusItems>
          </HeaderItemH>
        </Content>
      </Section>
    </StyledHeader>
  );
}

const HeaderWrapper = styled(ItemV)`
  overflow: hidden;
  width: 100%;
  display: none;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
`;

const LanguageItem = styled.div`
  list-style: none;
  margin: 0px 24px 0px 0px;

  @media ${device.laptop} {
    display: ${(props) => (props.showMobileMenu ? 'flex' : 'none')};
    margin: 0px;
    flex: 1;
    width: 100%;
  }

`;

// V2 Designs
const HeaderItemH = styled(ItemH)`
  margin: 45px 0 0 0;
  color: ${GLOBALS.COLORS.FONT_LIGHT};
  height: 77px;
  padding: 0px 16px;

  @media ${device.laptop} {
    margin: 25px;
    flex-direction: column;
    padding: 16px;
    height: fit-content;
  }

  @media ${device.mobileL} {
    margin: 8px;
    flex-direction: column;
    height: fit-content;
    padding: 12px 16px;
    box-sizing: border-box;
  }

  &.light {
    color: ${GLOBALS.COLORS.FONT_DARK};
    background: ${GLOBALS.COLORS.HEADER_BG_LIGHT};
  }
`;

const HeaderBlurV = styled(ItemV)`
  backdrop-filter: blur(32px);
  background: rgba(13, 13, 15, 0.50);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 24px;

  &.light {
    background: ${GLOBALS.COLORS.HEADER_BG_LIGHT};
  }
`;

const HeaderNavItemV = styled(ItemV)`
  margin: 0 ${GLOBALS.ADJUSTMENTS.PADDING.SMALL} 0 ${GLOBALS.ADJUSTMENTS.PADDING.SMALL};

  @media ${device.laptop} {
    margin: ${(props) => (props.showMobileMenu ? '20px 0 20px 0' : '0')};
  }

  @media ${device.laptop} {
    // margin-bottom: ${(props) => (props.showMobileMenu && '32px')};
  }
`;

const PushLogoWhiteContainer = styled(ItemV)`
  display: flex;
  &.light {
    display: none;
  }
`;

const PushLogoBlackContainer = styled(ItemV)`
  display: none;
  &.light {
    display: flex;
  }
`;

// V1 Designs
const HEADER_HEIGHT = 92;
const HEADER_VERTICAL_GUTTER = 7;
const BOX_MAX_WIDTH = 1140;

const StyledHeader = styled.header`
  font-family: 'Strawford';

  /* padding: 0px 160px; */
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  /* color: #ffffff;
  background: #121315; */
  opacity: 1;

  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;

  transition: top 0.3s ease-in-out;

  &.hide {
    top: -100%;
  }

  &.light {
    & span {
      color: #121315;
    }

    & svg.chevronIcon {
      fill: #121315;

      & path {
        stroke: #121315;
      }
    }
  }

  /* this is IMP for boxing the content at 1140px
  @media (min-width: 1213px) {
    padding-left: calc(50% - ${BOX_MAX_WIDTH / 2}px);
    padding-right: calc(50% - ${BOX_MAX_WIDTH / 2}px);
  } */

  /* height: ${HEADER_HEIGHT}px; */

  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${device.laptop} {
    /* height: ${(props) => (props.showMobileMenu ? '100%' : '48px')}; */
    flex-direction: column;

    &.hide {
      // top: -${HEADER_HEIGHT + HEADER_VERTICAL_GUTTER + 12}px;
      top: -100%;
    }
  }
`;

const MobileMenuToggleIcon = styled.span`
  display: none;

  @media ${device.laptop} {
    display: flex;
    cursor: pointer;
  }
`;

const MenuTop = styled(ItemV)`
  display: flex;

  & svg {
    cursor: pointer;
  }

  @media ${device.laptop} {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    // padding: ${(props) => (props.showMobileMenu ? '0px' : '12px 16px')};
  }
`;

const NavigationMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;

  column-gap: 32px;

  z-index: 999;

  @media ${device.laptop} {
    flex-direction: column;
    flex: 0 0 75%;
    align-self: stretch;
    display: ${(props) => (props.showMobileMenu ? 'flex' : 'none')};
  }
`;

/**
 * HOVER happens on this element
 */
const NavigationMenuItem = styled.li`
  position: relative;
  // Styles for the flags
  .flag-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  & span {
    font-family: "FK Grotesk Neue";

    padding: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: normal;
    color: #6C6C6C;
  }

  // & .chevronIcon {
  //   color: #6C6C6C;
  // }

  &:hover {
    & span {
      color: #fff;
    }

    & .chevronIcon {
      transform: rotate(180deg);
      // color: #fff;
    }

    & .menuContent {
      display: block;
    }
  }
`;

const NavMenuItemLink = styled(LinkTo)`
  flex: 1;
  margin: 0 auto;
  
  @media ${device.laptop} {
    flex: initial;
    margin: 16px;
  }
`;

const HeaderText = styled.div`
  padding: 0px;
  justify-content: flex-start;
  font-size: 16px;
  fontWeight: 400;
  line-height: 230%;
  letter-spacing: normal;

  &:hover:before {
    display: block;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const LanguageMenuItem = styled.li`
  position: relative;
  // Styles for the flags
  .flag-icon {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    display: block;
  }

  .flag-icon-drop {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: block;
  }

  padding-left: 16px;

  & span {
    font-family: 'Strawford';
    padding: 4px;
    font-weight: 500;
    font-size: 18px;
    line-height: 142%;
  }

  // &:hover {
  // & span {
  //   color: ${(props) => (props.expanded ? '#dd44b9' : '')};
  // }

  & .chevronIcon {
    color: #6C6C6C;
  }

  // & .menuContent {
  //   display: ${(props) => (props.expanded ? 'block' : 'none')};
  // }
  // }

  &:hover {
    & span {
      color: #dd44b9;
    }

    & .chevronIcon {
      transform: rotate(180deg);
      color: #FFF;
    }

    & .menuContent {
      display: block;
    }
  }

  @media ${device.laptop} {
    padding-left: 0px;
    flex: 1;
  }

`;

const NavigationMenuHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & span {
    color: inherit !important;
    padding: 12px 6px;
  }

  &:hover {
    cursor: pointer;

  }

  & .chevronIcon {
    transition-duration: 0.4s;
    transition-property: transform;
    color: inherit !important;
  }

  @media ${device.laptop} {
    justify-content: space-between;
    margin: 24px 0 0px 0;

    & span {
    padding: 0px;
    }

    & .chevronIcon {
      width: 16px;
      height: 16px;
      transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'none  !important')};
    }
  }

`;

const MenuHeader = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  margin: auto 0;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    flex: initial;
    margin: 0 0;
  }
`;

const LanguageMenuHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h2 {
    color: inherit !important;
  }

  & span {
    padding: 12px 6px;
  }

  &:hover {
    cursor: pointer;

  }

  & .chevronIcon {
    transition-duration: 0.4s;
    transition-property: transform;
    color: inherit !important;
  }

  @media ${device.laptop} {
    justify-content: flex-end;

    & span {
      padding: 0px;
    }

    & .chevronIcon {
      width: 16px;
      height: 16px;
      transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'none  !important')};
    }
  }

  @media ${device.laptop} {
     width: 100%;
    
     h2 {
       margin: 0 auto 0 0;
       padding: 4px;
    }
  }
`;

const NavigationMenuContent = styled.ul`
  list-style: none;

  font-family: 'Strawford', 'Manrope', sans-serif;
  display: none;
  position: absolute;

  // logic - this should touch the parent li for enough hover surface area.
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  padding: 10px 14px 24px 14px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: #19181B;

  @media (min-width: 1025px) {
    min-width: 470px;
    max-width: auto;
  }

  @media ${device.laptop} {
    width: 100%;
    position: relative;
    top: 0px;
    left: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0px 12px 14px 12px;
    max-height: 244px;
    min-height: 244px;

    overflow-y: auto;
    position: relative;
    clip-path: inset(0 round 24px);
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #CD3FAC;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 10px;
    }
    display: ${(props) => (props.expanded ? 'flex' : 'none !important')};
    & a {
      justify-content: flex-start;
    }
  }
`;

const HeaderFocusItems = styled(ItemH)`
  align-self: center;
  flex-wrap: nowrap;

  @media ${device.laptop} {
    flex-direction: column;
    width: 100%;
    flex: 1;
    // align-self: center;
    // flex-wrap: wrap;
  }

`;

const LanguageMenuContent = styled.div`
  list-style: none;

  font-family: 'Strawford', 'Manrope', sans-serif;
  display: none;
  position: absolute;

  // logic - this should touch the parent li for enough hover surface area.
  top: 44px;
  // top: 54px;

  left: 50%;
  transform: translateX(-90%);
  z-index: 1;
  padding: 10px 12px;


  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: #19181B;
  // min-width: 202px;


  & button {
    min-width: 182px;
  }

  @media ${device.laptop} {
    min-width: 100%;

    position: relative;
    top: 0px;
    left: 0;
    transform: none;
    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 2px 12px 2px 12px;

    display: ${(props) => (props.expanded ? 'flex' : 'none !important')};

    & a {
      justify-content: flex-start;
    }
  }
`;

const LanguageButton = styled(Button)`
  margin: 8px 0;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: none;


    h2 {
      color: #D98AEC;
    }
  }

  @media ${device.laptop} {
    width: 100%;
    flex: 1;
    margin: 8px 0;
  }

`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  gap: 6px;
  margin: 14px 0 0 0;
  cursor: pointer;

   @media (min-width: 1025px) {
    min-width: 450px;
  }


  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;


    h2 {
      color: #D98AEC;
    }
    & ${Image} {
      filter: brightness(0) saturate(100%) invert(83%) sepia(53%) saturate(5899%) hue-rotate(225deg) brightness(107%) contrast(85%);
    }
  }
  

  @media ${device.laptop} {
    max-width: 100%;
    margin: 6px 0 0 0;
  }

`;

const HeaderImage = styled(Image)`
  margin: 10px;

  @media ${device.laptop} {
    margin: 10px 10px 10px 0;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const DappLauncher = styled(A)`
  padding: 14px 38px;
  font-family: FK Grotesk Neue;
  height: 48px;
  min-width: 140px;

  @media ${device.laptop} {
    align-self: stretch;
    display: ${(props) => (props.showMobileMenu ? 'flex' : 'none')};
    flex: 0 1 100%;
    margin-top: ${(props) => (props.showMobileMenu && '32px')};
  }
`;

const TagItem = styled.b`
    width: fit-content;
    border-radius: 12px;
    border: 1px solid #D98AEC;
    background: transparent;
    padding: 2px 5px;
    color: #D98AEC;
    // text-align: center;
    font-size: 9px;
    font-style: normal;
    font-weight: bolder;
    line-height: normal;
`;

export default Header;
