import React from 'react';
import {SvgProps} from 'react-native-svg';

import AiSvg from '../../assets/images/ai.svg';
import AiIntelligenceSvg from '../../assets/images/ai_intelligence.svg';
import ButtonGradientBG from '../../assets/images/gradient_button_bg.svg';
import CalenderSvg from '../../assets/images/calender.svg';
import ChevronRightSvg from '../../assets/images/chevron_right.svg';
import ChevronDownSvg from '../../assets/images/chevron_down.svg';
import CheckCircleSvg from '../../assets/images/check_circle.svg';
import CirclesSvg from '../../assets/images/circles.svg';
import CprSvg from '../../assets/images/cpr.svg';
import ChatSvg from '../../assets/images/chat_icon.svg';
import DashSvg from '../../assets/images/dash.svg';
import DashboardSvg from '../../assets/images/dashboard.svg';
import DataSvg from '../../assets/images/data.svg';
import DnaSvg from '../../assets/images/dna.svg';
import EyeSvg from '../../assets/images/eye.svg';
import FilterSvg from '../../assets/images/filter.svg';
import IconGradientBG from '../../assets/images/gradient_icon_bg.svg';
import InfoSvg from '../../assets/images/info.svg';
import InvestigateSvg from '../../assets/images/investigate_icon.svg';
import LocationSvg from '../../assets/images/location.svg';
import LogoutSvg from '../../assets/images/logout.svg';
import MailSvg from '../../assets/images/mail.svg';
import MapPinSvg from '../../assets/images/map_pin.svg';
import MenuSvg from '../../assets/images/menu.svg';
import NotifySvg from '../../assets/images/notify.svg';
import PasswordSvg from '../../assets/images/password.svg';
import PatientQueueSvg from '../../assets/images/patient_queue.svg';
import PatientsSvg from '../../assets/images/patients.svg';
import PersonSvg from '../../assets/images/person.svg';
import PlaceholderSvg from '../../assets/images/placeholder.svg';
import ProtocolSvg from '../../assets/images/protocol_icon.svg';
import ResetSvg from '../../assets/images/reset.svg';
import RecentSVG from '../../assets/images/recent.svg';
import RightArrowSvg from '../../assets/images/right_arrow.svg';
import SearchSvg from '../../assets/images/search.svg';
import ShareSvg from '../../assets/images/share.svg';
import StethoscopeSvg from '../../assets/images/stethoscope.svg';
import TrialsSvg from '../../assets/images/trails.svg';
import TrendingSvg from '../../assets/images/trending.svg';

function wrap(Svg: React.FC<SvgProps>): React.FC<SvgProps> {
  return ({style, ...props}) =>
    React.createElement(Svg, {
      ...props,
      style: [{backgroundColor: 'transparent'}, style],
    });
}

export const AiIcon             = wrap(AiSvg);
export const AiIntelligenceIcon = wrap(AiIntelligenceSvg);
export const ButtonGradientBGIcon = wrap(ButtonGradientBG);
export const CalenderIcon       = wrap(CalenderSvg);
export const ChevronDownIcon    = wrap(ChevronDownSvg);
export const ChevronRightIcon   = wrap(ChevronRightSvg);
export const CheckCircleIcon    = wrap(CheckCircleSvg);
export const CirclesIcon        = wrap(CirclesSvg);
export const CprIcon            = wrap(CprSvg);
export const ChatIcon           = wrap(ChatSvg);
export const DashIcon           = wrap(DashSvg);
export const DashboardIcon      = wrap(DashboardSvg);
export const DataIcon           = wrap(DataSvg);
export const DnaIcon            = wrap(DnaSvg);
export const EyeIcon            = wrap(EyeSvg);
export const FilterIcon         = wrap(FilterSvg);
export const IconGradientBGIcon = wrap(IconGradientBG);
export const InfoIcon           = wrap(InfoSvg);
export const InvestigateIcon    = wrap(InvestigateSvg);
export const LocationIcon       = wrap(LocationSvg);
export const LogoutIcon         = wrap(LogoutSvg);
export const MailIcon           = wrap(MailSvg);
export const MapPinIcon         = wrap(MapPinSvg);
export const MenuIcon           = wrap(MenuSvg);
export const NotifyIcon         = wrap(NotifySvg);
export const PasswordIcon       = wrap(PasswordSvg);
export const PatientQueueIcon   = wrap(PatientQueueSvg);
export const PatientsIcon       = wrap(PatientsSvg);
export const PersonIcon         = wrap(PersonSvg);
export const PlaceholderIcon    = wrap(PlaceholderSvg);
export const ProtocolIcon       = wrap(ProtocolSvg);
export const ResetIcon          = wrap(ResetSvg);
export const RecentIcon         = wrap(RecentSVG);
export const RightArrowIcon     = wrap(RightArrowSvg);
export const SearchIcon         = wrap(SearchSvg);
export const ShareIcon          = wrap(ShareSvg);
export const StethoscopeIcon    = wrap(StethoscopeSvg);
export const TrialsIcon         = wrap(TrialsSvg);
export const TrendingIcon       = wrap(TrendingSvg);

