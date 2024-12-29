

import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  flush,
  flushMicrotasks,
  discardPeriodicTasks,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LocalStorageKeys } from '../shared/models/localstorage-keya.enum';
import { BaggageDetailsService } from '../shared/services/baggage-details.service';
import { SharedDataService } from '../shared/services/shared-data-service';
import { PpbmBagsSummarization } from './ppbm-bags-summarization.component';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from 'src/app/shared/directives/sort';
import { LoadHoldService } from '../shared/services/load-hold.service';
import { AppConfigService } from '../shared/services/app-config/app-config.service';

const mockData = {
  statusCode: 200,
  message: 'Success',
  response: [
    {
      id: 'UA2138:20230222:ORD',
      flightNumber: '2138',
      carrierCode: 'UA',
      date: '01',
      route: 'ORD - SFO',
      status: 'ON-TIME',
      boardingStartTime: '13:45',
      localEstimatedDepartureDate: '2023-02-01T16:43:00-08:00',
      utcEstimatedDepartureDate: '2023-02-01T18:43:00Z',
      departureGate: 'C23',
      acftType: '485-904ER',
      bagScannedOn: '100%',
      bagDetails: [
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
          bagTagNumber: '3016617372',
          storageId: '',
          isCheked: false,
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: true,
          needToOffload: true,
          isAutoHeldoff: false,
          isCSRHeldoff: true,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608268',
          bagTagNumber: '3016617374',
          storageId: '',
          isChecked: false,
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: true,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: true,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617375',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: true,
          isMissingBag: true,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: false,
          isUnknowPaxStat: false,
          isAttemptedScan: true,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617889',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: false,
          isDepartureScan: false,
          isPassengerExpected: false,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: true,
          isBagExpected: false,
          isBagIssued: true,
          isConnectionBag: false,
          isBagScanned: false,
          isUnknowPaxStat: true,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: false,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: false,
        },
      ],
    },
    {
      id: 'UA944:20230222:ORD',
      flightNumber: '944',
      carrierCode: 'UA',
      date: '22',
      route: 'ORD - SFO',
      boardingStartTime: '13:45',
      localEstimatedDepartureDate: '2023-03-05T20:35:00-06:00',
      utcEstimatedDepartureDate: '2023-03-05T23:35:00',
      departureGate: 'B1',
      status: 'ON-TIME',
      acftType: '490-900ER',
      bagScannedOn: '100%',
      bagDetails: [
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
          bagTagNumber: '3016617372',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: true,
          isAutoHeldoff: false,
          isCSRHeldoff: true,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608268',
          bagTagNumber: '3016617374',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: true,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: true,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617375',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: true,
          isMissingBag: true,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: false,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617889',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: false,
          isDepartureScan: false,
          isPassengerExpected: false,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: false,
          isBagIssued: true,
          isConnectionBag: false,
          isBagScanned: false,
          isUnknowPaxStat: true,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: false,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: false,
        },
      ],
    },
    {
      id: 'UA1234:20230313:ORD',
      flightNumber: '1234',
      carrierCode: 'UA',
      date: '01',
      route: 'ORD - SFO',
      status: 'ON-TIME',
      boardingStartTime: '13:45',
      localEstimatedDepartureDate: '2023-02-01T13:43:00-08:00',
      utcEstimatedDepartureDate: '2023-02-01T21:43:00Z',
      departureGate: 'C23',
      acftType: '737-900ER',
      bagScannedOn: '100%',
      bagDetails: [
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
          bagTagNumber: '3016617372',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: false,
          isCSRHeldoff: true,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608268',
          bagTagNumber: '3016617374',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: true,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617375',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: true,
          isMissingBag: true,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: false,
          isConnectionBag: true,
          isBagScanned: false,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: true,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          bagTagNumber: '3016617889',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: false,
          isDepartureScan: false,
          isPassengerExpected: false,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: false,
          isBagIssued: true,
          isConnectionBag: false,
          isBagScanned: false,
          isUnknowPaxStat: true,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: false,
          isCSRHeldoff: false,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: false,
        },
      ],
    },
  ],
};

describe('PpbmBagsSummarization', () => {
  let component: PpbmBagsSummarization;
  let fixture: ComponentFixture<PpbmBagsSummarization>;
  let service: BaggageDetailsService;
  let sharedDataService: SharedDataService;
  let loadHoldService: LoadHoldService;
  let modalService: NgbModal;
  let router: Router;
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpbmBagsSummarization],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        BaggageDetailsService,
        SharedDataService,
        LoadHoldService,
        Sort,
        AppConfigService,
        {
          provide: ActivatedRoute,
          NgbModal,
          useValue: {
            snapshot: {
              queryParams: {
                currentBadge: 'isConnectionBag',
              },
              params: {
                id: 'CA343:20230128:ORD',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PpbmBagsSummarization);
    component = fixture.componentInstance;
    sharedDataService = TestBed.inject(SharedDataService);
    service = TestBed.inject(BaggageDetailsService);
    loadHoldService = TestBed.inject(LoadHoldService);
    modalService = TestBed.inject(NgbModal);
    router = TestBed.inject(Router);
    appConfigService = TestBed.inject(AppConfigService);
    const localStorageData =
      '{"UA944:20230222:ORD":{"selectedFlightOption":"UA944:20230222:ORD","flightOptions":[{"name":"UA 1234-13, ORD - SFO","value":"UA1234:20230313:ORD"},{"name":"UA 684-22, ORD - SFO","value":"UA944:20230222:ORD"},{"name":"UA 2138-22, ORD - SFO","value":"UA2138:20230222:ORD"}],"currentTab":"All","isSelectedFlight":true}}';
    localStorage.setItem(LocalStorageKeys.SelectedFlights, localStorageData);
    fixture.detectChanges();
    appConfigService.appSync = {
      aws_appsync_graphqlEndpoint:
        'https://fe7qi74wyzg4dlavcvjcps5nj4.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      aws_appsync_apikey: 'da2-uwyxdxd3l5hjbfudsadwrtjgee',
      cognito_user_pools: false,
    };
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('shpld set data according localstorage', () => {
    expect(component.currentTab).toBe('All');

    expect(component.flightKeyOption).toEqual([
      {
        name: 'UA 1234-13, ORD - SFO',
        value: 'UA1234:20230313:ORD',
      },
      {
        name: 'UA 684-22, ORD - SFO',
        value: 'UA944:20230222:ORD',
      },
      {
        name: 'UA 2138-22, ORD - SFO',
        value: 'UA2138:20230222:ORD',
      },
    ]);
  });

  it('should be called getBaggageDetails and counts sets', () => {
    const copyMockData = mockData;
    copyMockData.response = mockData?.response?.find(
      (detail) => detail.id === component.flightId
    ) as any;
    spyOn(service, 'getBaggageDetails').and.returnValue(
      of(copyMockData as any)
    );
    expect(component.bagIssueCount).toBe(0);
    expect(component.connectionBagCount).toBe(0);
    expect(component.scannedBagCount).toBe(0);
    expect(component.missingBagCount).toBe(0);
    expect(component.paxNotBoarderdCount).toBe(0);
    expect(component.uknownPaxStatCount).toBe(0);
    expect(component.attemptedScanCount).toBe(0);
    expect(component.needToOffroadScanCount).toBe(0);
    expect(component.autoHelfoffCount).toBe(0);
    expect(component.csrHeldOffCount).toBe(0);
    component.getBaggageDetails();
    expect(component.bagIssueCount).toBe(2);
    expect(component.connectionBagCount).toBe(3);
    expect(component.scannedBagCount).toBe(2);
    expect(component.missingBagCount).toBe(1);
    expect(component.paxNotBoarderdCount).toBe(1);
    expect(component.uknownPaxStatCount).toBe(1);
    expect(component.attemptedScanCount).toBe(1);
    expect(component.needToOffroadScanCount).toBe(1);
    expect(component.autoHelfoffCount).toBe(2);
    expect(component.csrHeldOffCount).toBe(1);
    expect(component.carrierCode).toBe('UA');
    expect(component.startRoute).toBe('ORD');
    expect(component.endRoute.trim()).toBe('SFO');
    expect(component.flightNumber).toBe('944');
  });

  it('should redirect if backClick method called', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.backClick();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should selected badge value change after user click call onBadgeChange method', () => {
    expect(component.activeBag).toBe('isConnectionBag');
    expect(component.activeBadgeName).toBe('Connection bags');
    component.onBadgeChange('isMissingBag', 'Bags not scanned', 1);
    expect(component.activeBag).toBe('isMissingBag');
    expect(component.activeBadgeName).toBe('Bags not scanned');
  });

  it('shoudl be seleced flight key change when user change flight drop down', () => {
    expect(component.selectedFlightKey).toBe('UA944:20230222:ORD');
    component.onFlightSelected('UA1234:20230313:ORD');
    expect(component.flightId).toBe('UA1234:20230313:ORD');
  });

  it('baggededDetail should be blank when we get null data', () => {
    spyOn(service, 'getBaggageDetails').and.returnValue(
      of({
        statusCode: 200,
        message: 'Success',
        response: null,
      } as any)
    );
    component.getBaggageDetails();
    expect(component.baggageDetails).toBeNull();
    expect(component.baggageDetailsList.length).toBe(0);
    expect(component.startRoute).toBeFalsy();
    expect(component.endRoute).toBeFalsy();
  });
  it('should call and subscribe to updateBagDetailData', fakeAsync(() => {
    const flightData = {
      id: 'UA2138:20230222:ORD',
      flightNumber: '2138',
      carrierCode: 'UA',
      date: '01',
      route: 'ORD - SFO',
      status: 'ON-TIME',
      boardingStartTime: '13:45',
      localEstimatedDepartureDate: '2023-02-01T16:43:00-08:00',
      utcEstimatedDepartureDate: '2023-02-01T18:43:00Z',
      departureGate: 'C23',
      acftType: '485-904ER',
      bagScannedOn: '100%',
      bagDetails: [
        {
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
          bagTagNumber: '3016617372',
          storageId: '',
          sequenceNumber: '',
          type: ['B'],
          bagConxTime: '',
          paxConxTime: '',
          checked: true,
          loadStatus: '',
          lastStatus: ' ',
          lastScanBy: null,
          lastLocalScanTime: '',
          lastUTCScanTime: '',
          passengerFirstName: 'DANIELLE',
          passengerLastName: 'KNIGHT',
          pnr: 'I0VL27',
          paxStatusAndSeat: '',
          groupTier: 'MEMBER',
          isPassengerBoarded: false,
          isPassengerCheckedIn: true,
          isDepartureScan: true,
          isPassengerExpected: true,
          isRush: false,
          isReroute: false,
          isMissingBag: false,
          isNoNameBag: false,
          isBagExpected: true,
          isBagIssued: true,
          isConnectionBag: true,
          isBagScanned: true,
          isUnknowPaxStat: false,
          isAttemptedScan: false,
          needToOffload: false,
          isAutoHeldoff: false,
          isCSRHeldoff: true,
          isPaxOnBagsOff: false,
          isPaxNotBoarded: true,
        },
      ],
    };
    sessionStorage.setItem('singleBagDetailsData', JSON.stringify(flightData));
    sharedDataService.updateBagDetailData.next(flightData);
    sharedDataService.updateBagDetailData.subscribe((data) => {
      expect(data).toBe(flightData);
    });
  }));

  it('should call confirmationCheck when checkbox is checked', () => {
    component.getBaggageDetails();
    component.setBaggedDetails();
    component.count = 1;
    component.btnLoad = true;
    component.btnHold = true;
    component.btnAddNote = true;
    component.baggageDetailsList = [
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617889',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: '',
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
        passengerFirstName: 'Sai Nikhil',
        passengerLastName: 'Abburi',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: true,
        isPassengerCheckedIn: false,
        isDepartureScan: false,
        isPassengerExpected: true,
        isRush: false,
        isDeleted: true,
        csrAuthorization: {
          agentName: 'joe',
          reasonCode: 'ecd',
          loadStatus: 'Hold',
          updatedTime: '9:30',
        },
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: false,
        isBagIssued: true,
        isConnectionBag: false,
        isBagScanned: false,
        isUnknowPaxStat: false,
        isAttemptedScan: false,
        needToOffload: false,
        isAutoHeldoff: false,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: false,
        isNote: true,
        fullName: 'Abburi, Sai Nikhil',
        statusTime: '',
        isChecked: true,
        arrivalStation: '',
    isLoadHoldNote: false
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617890',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: '',
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerKey: '',
        passengerFirstName: 'Sai Nikhil',
        passengerLastName: 'Abburi',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: true,
        isPassengerCheckedIn: false,
        isDepartureScan: false,
        isPassengerExpected: true,
        isRush: false,
        isDeleted: true,
        csrAuthorization: {
          agentName: 'joe',
          reasonCode: 'ecd',
          loadStatus: 'Hold',
          updatedTime: '9:30',
        },
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: false,
        isBagIssued: true,
        isConnectionBag: false,
        isBagScanned: false,
        isUnknowPaxStat: false,
        isAttemptedScan: false,
        needToOffload: false,
        isAutoHeldoff: false,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: false,
        isNote: false,
        fullName: 'Abburi, Sai Nikhil',
        statusTime: '',
        isChecked: false,
        arrivalStation: '',
    isLoadHoldNote: false
      },
    ];
    fixture.detectChanges();
    component.confirmationCheck(null);
    expect(component.btnLoad).toBe(true);
    expect(component.btnHold).toBe(true);
    expect(component.btnAddNote).toBe(true);
  });

  it('should open modal servie called', () => {
    const openSpy = spyOn(modalService, 'open').and.returnValue({
      componentInstance: { holdOffBags: [] },
    } as any);
    component.baggageDetailsList = [
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617372',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: true,
        isAutoHeldoff: false,
        isCSRHeldoff: true,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
    ] as any;
    component.openAddNoteHoldLoadModal('Hold', '');
    expect(openSpy).toHaveBeenCalled();
  });
  it('should call refreshBagsIssuedData function', fakeAsync(() => {
    component.ngOnInit();
    sharedDataService.refreshBagsIssuedData.next(true);
    sharedDataService.refreshBagsIssuedData.subscribe((data) => {
      expect(data).toBe(true);
      component.getBaggageDetails();
    });
    tick(10000);
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
  it('should call initialization function', fakeAsync(() => {
    component.ngOnInit();
    component.initialization();
    tick(10000);
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should open bagge detail dialog', () => {
    component.baggageDetailsList = [
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617372',
        storageId: '',
        isCheked: false,
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: true,
        isAutoHeldoff: false,
        isCSRHeldoff: true,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608268',
        bagTagNumber: '3016617374',
        storageId: '',
        isChecked: false,
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: true,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: false,
        isAutoHeldoff: true,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
        bagTagNumber: '3016617375',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: true,
        isMissingBag: true,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: false,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: false,
        isAutoHeldoff: true,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
        bagTagNumber: '3016617889',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: false,
        isDepartureScan: false,
        isPassengerExpected: false,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: true,
        isBagExpected: false,
        isBagIssued: true,
        isConnectionBag: false,
        isBagScanned: false,
        isUnknowPaxStat: true,
        isAttemptedScan: false,
        needToOffload: false,
        isAutoHeldoff: false,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: false,
      },
    ] as any;
    const spy = spyOn(window.history, 'replaceState');
    component.openBagdetail(component?.baggageDetailsList[0]);
    expect(spy).toHaveBeenCalled();
  });
  it('should open bagge detail dialog', () => {
    component.baggageDetailsList = [
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617372',
        storageId: '',
        isCheked: false,
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: true,
        isAutoHeldoff: false,
        isCSRHeldoff: true,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608268',
        bagTagNumber: '3016617374',
        storageId: '',
        isChecked: false,
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: true,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: false,
        isAutoHeldoff: true,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
        bagTagNumber: '3016617375',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: true,
        isMissingBag: true,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: false,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: false,
        isAutoHeldoff: true,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608269',
        bagTagNumber: '3016617889',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: false,
        isDepartureScan: false,
        isPassengerExpected: false,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: true,
        isBagExpected: false,
        isBagIssued: true,
        isConnectionBag: false,
        isBagScanned: false,
        isUnknowPaxStat: true,
        isAttemptedScan: false,
        needToOffload: false,
        isAutoHeldoff: false,
        isCSRHeldoff: false,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: false,
      },
    ] as any;
    const spy = spyOn(window.history, 'replaceState');
    component.openBagdetail(component?.baggageDetailsList[0]);
    expect(spy).toHaveBeenCalled();
  });
  it('should call and subscribe to baggageDetailsService.getBaggageDetails and throw error', fakeAsync(() => {
    const errorData = { msg: 'Error message' };
    const getBaggageDetailsByBagTagSpy = spyOn(
      service,
      'getBaggageDetails'
    ).and.returnValue(throwError(errorData));

    service.getBaggageDetails('73884777').subscribe(
      (data) => {},
      (error) => {
        expect(error.msg).toEqual(errorData.msg);
      }
    );
    component.getBaggageDetails();
    tick(100);
    expect(getBaggageDetailsByBagTagSpy).toHaveBeenCalled();
  }));

  it('should open view note modal', () => {
    const openSpy = spyOn(modalService, 'open').and.returnValue({
      componentInstance: { bagView: [] },
    } as any);
    component.baggageDetailsList = [
      {
        bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
        bagTagNumber: '3016617372',
        storageId: '',
        sequenceNumber: '',
        type: ['B'],
        bagConxTime: '',
        paxConxTime: '',
        checked: true,
        loadStatus: '',
        lastStatus: ' ',
        lastScanBy: null,
        lastLocalScanTime: '',
        lastUTCScanTime: '',
        passengerFirstName: 'DANIELLE',
        passengerLastName: 'KNIGHT',
        pnr: 'I0VL27',
        paxStatusAndSeat: '',
        groupTier: 'MEMBER',
        isPassengerBoarded: false,
        isPassengerCheckedIn: true,
        isDepartureScan: true,
        isPassengerExpected: true,
        isRush: false,
        isReroute: false,
        isMissingBag: false,
        isNoNameBag: false,
        isBagExpected: true,
        isBagIssued: false,
        isConnectionBag: true,
        isBagScanned: true,
        isUnknowPaxStat: false,
        isAttemptedScan: true,
        needToOffload: true,
        isAutoHeldoff: false,
        isCSRHeldoff: true,
        isPaxOnBagsOff: false,
        isPaxNotBoarded: true,
      },
    ] as any;
    const mockNoteData = {
      statusCode: 200,
      message: 'Success',
      bagDetails: [
        {
          bagTagNumber: '3016617889',
          bagKey: '0741d38d-1862-4b7e-9036-04d1fa608267',
          loadHoldInfo: [
            {
              loadStatus: 'Hold',
              agentID: 'v6737377',
              agentName: 'Peter Smith',
              rsnCd: 'Connection',
              rsnDesc:
                'Test Reason Description (In case of Load, value will be empty)',
              actionTimeStamp: '06/02 05:35',
              notes: 'Customer scanned on board UA904-08',
            },
            {
              loadStatus: 'Load',
              agentID: 'v6737345',
              agentName: 'John Doe',
              rsnCd: 'Check in late',
              rsnDesc:
                'Test Reason Description (In case of Load, value will be empty)',
              actionTimeStamp: '08/02 07:35',
              notes: 'Bag was offloaded, gate agent is paging customer.',
            },
          ],
        },
      ],
    };
    sharedDataService.noteUpdateInfo.next(mockNoteData);
    spyOn(loadHoldService, 'noteUpdateInfo').and.returnValue(
      of(mockNoteData as any)
    );
    component.openAddNoteHoldLoadModal('View Note', '8438348');
    expect(openSpy).toHaveBeenCalled();
  });
});
