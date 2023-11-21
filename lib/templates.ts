import { Profile } from './types';

export const emptyProfile: Profile = {
  birthDate: new Date().toDateString(),
  firstName: '',
  lastName: '',
  location: '',
  avatarImage: null,
  wantDifferenceWorld: false,
  wantDiversifyPortfolio: false,
  wantSpecificCause: false,
  wantTaxIncentives: false,
  sdg: [],
  projects: [],
  donations: [],
  balance: 0,
  requestingFunds: false,
};

export const dayMilliseconds = 1000 * 60 * 60 * 24;

export const SDGs = {
  SDG01: require(`../assets/sdg/SDG1.png`),
  SDG02: require(`../assets/sdg/SDG2.png`),
  SDG03: require(`../assets/sdg/SDG3.png`),
  SDG04: require(`../assets/sdg/SDG4.png`),
  SDG05: require(`../assets/sdg/SDG5.png`),
  SDG06: require(`../assets/sdg/SDG6.png`),
  SDG07: require(`../assets/sdg/SDG7.png`),
  SDG08: require(`../assets/sdg/SDG8.png`),
  SDG09: require(`../assets/sdg/SDG9.png`),
  SDG10: require(`../assets/sdg/SDG10.png`),
  SDG11: require(`../assets/sdg/SDG11.png`),
  SDG12: require(`../assets/sdg/SDG12.png`),
  SDG13: require(`../assets/sdg/SDG13.png`),
  SDG14: require(`../assets/sdg/SDG14.png`),
  SDG15: require(`../assets/sdg/SDG15.png`),
  SDG16: require(`../assets/sdg/SDG16.png`),
  SDG17: require(`../assets/sdg/SDG17.png`),
};

export const includedSDGs = [1, 4, 12, 13, 15];
