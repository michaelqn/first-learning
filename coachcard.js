// coaching-card-data.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachingCardDataComponent } from './coaching-card-data.component';
import * as _ from 'lodash'; // Assuming 'get' is from lodash

// Mock interfaces
interface ProgressBarModel {
  color: string;
  value: number;
}

interface BalanceCoachingCardInput {
  acctNum: string;
}

interface StateComponentQuery {
  query: string;
  balance: BalanceCoachingCardInput;
}

interface CoachingCardServiceModel {
  getPosition?: {
    accountBalance?: {
      balance: number;
    };
  };
}

// Mock constants
const COACHING_CARD_QUERY = 'mock-query';

describe('CoachingCardDataComponent', () => {
  let component: CoachingCardDataComponent;
  let fixture: ComponentFixture<CoachingCardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachingCardDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoachingCardDataComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with correct default values', () => {
      expect(component.acctNum).toBe('Y80020937');
      expect(component.coachingEligibilityBalance).toBe(25000);
      expect(component.progressBars).toBeUndefined();
      expect(component.nullDataFlag).toBeUndefined();
      expect(component.queryParameters).toBeUndefined();
      expect(component.coachingCard).toBeUndefined();
      expect(component.accountBalance).toBeUndefined();
      expect(component.isLoading).toBeUndefined();
    });
  });

  describe('ngOnInit', () => {
    it('should set isLoading to true and initialize queryParameters', () => {
      component.ngOnInit();

      expect(component.isLoading).toBe(true);
      expect(component.queryParameters).toEqual({
        query: COACHING_CARD_QUERY,
        balance: { acctNum: 'Y80020937' },
      });
    });
  });

  describe('setData', () => {
    let mockEvent: CoachingCardServiceModel;

    beforeEach(() => {
      spyOn(console, 'log'); // Spy on console.log to prevent it from cluttering test output
      spyOn(component, 'setProgressBar'); // Spy on setProgressBar to test if it's called
      spyOn(_, 'get').and.callFake((obj, path, defaultValue) => {
        if (path === 'getPosition') {
          return obj.getPosition || defaultValue;
        }
        if (path === 'accountBalance') {
          return obj.accountBalance || defaultValue;
        }
        return defaultValue;
      });
    });

    it('should set coachingCard and accountBalance, and call setProgressBar when accountBalance exists', () => {
      mockEvent = {
        getPosition: {
          accountBalance: { balance: 20000 },
        },
      };

      component.setData(mockEvent);

      expect(component.coachingCard).toBe(mockEvent);
      expect(component.isLoading).toBe(false);
      expect(component.accountBalance).toEqual({ balance: 20000 });
      expect(component.nullDataFlag).toBeUndefined();
      expect(component.setProgressBar).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('this.accountBalance >>>', { balance: 20000 });
    });

    it('should set nullDataFlag to true when accountBalance is empty', () => {
      mockEvent = {
        getPosition: {
          accountBalance: {},
        },
      };

      component.setData(mockEvent);

      expect(component.coachingCard).toBe(mockEvent);
      expect(component.isLoading).toBe(false);
      expect(component.accountBalance).toEqual({});
      expect(component.nullDataFlag).toBe(true);
      expect(component.setProgressBar).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('this.accountBalance >>>', {});
    });
  });

  describe('setProgressBar', () => {
    it('should initialize progressBars as empty array when accountBalance is undefined', () => {
      component.accountBalance = undefined;
      component.setProgressBar();

      expect(component.progressBars).toEqual([]);
    });

    it('should set progressBars when accountBalance.balance is less than coachingEligibilityBalance', () => {
      component.accountBalance = { balance: 20000 };
      component.setProgressBar();

      expect(component.progressBars).toEqual([
        { color: '#368727', value: 20000 },
        { color: '#F2F2F2', value: 25000 },
      ]);
    });

    it('should set progressBars as empty array when accountBalance.balance is greater than or equal to coachingEligibilityBalance', () => {
      component.accountBalance = { balance: 30000 };
      component.setProgressBar();

      expect(component.progressBars).toEqual([]);
    });
  });
});