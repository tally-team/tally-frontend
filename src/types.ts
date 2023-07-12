import { DispatchActions } from './constants';

export type AppState = {
  total: number;
  items: {
    [name: string]: {
      price: number;
      purchaserList: string[];
    };
  };
  party: string[];
  tip: number;
  tax: number;
};

type PartyMemberDetails = {
  name: string;
};

type ItemDetails = {
  name: string;
  price: number;
  purchaserList: string[];
};

type TaxDetails = {
  amount: number;
};

type TipDetails = {
  amount: number;
};

export type DispatchActionArgs = {
  type: DispatchActions;
  partyMemberDetails: PartyMemberDetails;
  itemDetails: ItemDetails;
  taxDetails: TaxDetails;
  tipDetails: TipDetails;
};
