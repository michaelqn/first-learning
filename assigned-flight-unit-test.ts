import { DatePipe } from '@angular/common';
import { PpbmDatePipe } from './../shared/pipes/ppbm-date.pipe';
import { Sort } from './../shared/directives/sort';
import { FlightViewService } from './../shared/services/flight-view.service';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  flush,
  flushMicrotasks,
  discardPeriodicTasks,
} from '@angular/core/testing';
import { PpbmFlightsComponent } from './ppbm-flights.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PPBMFlightsScreenType } from '../shared/models/ppbm-flights.model';
import { LocalStorageKeys } from '../shared/models/localstorage-keya.enum';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSyncService } from '../shared/services/app-sync.service';
import { SharedDataService } from '../shared/services/shared-data-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('PpbmFlightsComponent', () => {
  let component: PpbmFlightsComponent;
  let fixture: ComponentFixture<PpbmFlightsComponent>;
  let service: FlightViewService;
  let router: Router;
  let appSyncService: AppSyncService;
  let sharedDataService: SharedDataService;
  let mockScreenType = {
    isLargeScreen: true,
    isMediumScreen: false,
    isMobileScreen: false,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpbmFlightsComponent, PpbmDatePipe],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        FlightViewService,
        Sort,
        AppSyncService,
        SharedDataService,
        DatePipe,
        PpbmDatePipe,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PpbmFlightsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FlightViewService);
    sharedDataService = TestBed.inject(SharedDataService);
    appSyncService = TestBed.inject(AppSyncService);
    const modalService = TestBed.inject(NgbModal);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should allFlight key true when user click AllFlight tab', () => {
    component.onSelectedTabChanged({ index: 1 } as any);
    expect(component.allFlightsTab).toBeTruthy();
    expect(component.closedFlightTab).toBeFalsy();
  });

  it('should call getScreenType and subscribe to screenTypeChange', fakeAsync(() => {
    service.screenTypeChange.next(mockScreenType);

    service.screenTypeChange.subscribe(() => {
      expect(component.isLargeScreen).toBe(true);
      expect(component.isMediumScreen).toBe(false);
      expect(component.isMobileScreen).toBe(false);
    });
    component.getScreenType();
    tick(100);
  }));
  it('should check getAssignedFlightsData', () => {
    localStorage.setItem(
      component.currentTabKey,
      PPBMFlightsScreenType.AssignedFlights
    );
    component.allFlightsTab = false;
    component.closedFlightTab = false;
    component.selectedTabIndex = 0;
    const getAssignedFlightsDataSpy = spyOn(
      component,
      'getAssignedFlightsData'
    );

    component.ngOnInit();
    expect(getAssignedFlightsDataSpy).toHaveBeenCalled();
  });
  it('should call getAssignedFlightsData and subscribe to flightViewService.getAssignedFlightsData', fakeAsync(() => {
    let flightData = {
      statusCode: 200,
      message: 'Success',
      responseList: [
        {
          flightKey: 'UA343:20230121:ORD',
          localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
          utcEstimatedDepartureDate: '2023-01-21T17:05:00Z',
          arrivalStation: 'SFO',
          departureDate: '2023-01-21',
          userId: 'V847944',
        },
        {
          flightKey: 'CA343:20230121:ORD',
          localEstimatedDepartureDate: '2023-01-24T17:45:00-06:00',
          utcEstimatedDepartureDate: '2023-01-24T17:55:00Z',
          arrivalStation: 'ORD',
          departureDate: '2024-11-21',
          userId: 'N847944',
        },
      ],
    };
    const headers = [
      {
        key: 'flightNumber',
        displayValue: 'Flight #',
        sort: 'desc',
        className: 'flight-number',
      },
      {
        key: 'deptGate',
        displayValue: 'Gate',
        sort: 'desc',
        className: 'dept-gate',
      },
      {
        key: 'status',
        displayValue: 'Status',
        sort: 'desc',
        className: 'status',
      },
      { key: 'etd', displayValue: 'ETD', sort: 'desc', className: 'etd' },
      { key: 'dest', displayValue: 'Dest', sort: 'desc', className: 'dest' },
      {
        key: 'bagsIssued',
        displayValue: 'Bags issued',
        sort: 'desc',
        className: 'bags-issued',
      },
      {
        key: 'conxBags',
        displayValue: 'Conx bags',
        sort: 'desc',
        className: 'conx-bags',
      },
      {
        key: 'bagsScan',
        displayValue: 'Bags scanned',
        sort: 'desc',
        className: 'bags-scanned',
      },
      {
        key: 'bagsNotScan',
        displayValue: 'Bags not scanned',
        sort: 'desc',
        className: 'bags-not-scanned',
      },
      {
        key: 'paxNotBoarded',
        displayValue: 'Pax w bags not boarded',
        sort: 'desc',
        className: 'pax-not-boarded',
      },
      {
        key: 'unknowPax',
        displayValue: 'Unknown pax stat',
        sort: 'desc',
        className: 'unknown-pax-stat',
      },
      {
        key: 'attemptedScan',
        displayValue: 'Attempted scan',
        sort: 'desc',
        className: 'attempted-scan',
      },
      {
        key: 'needOffload',
        displayValue: 'Need to offload',
        sort: 'desc',
        className: 'need-to-offload',
      },
      {
        key: 'autoHeldoff',
        displayValue: 'Auto heldoff',
        sort: 'desc',
        className: 'auto-heldoff',
      },
      {
        key: 'csrHeldoff',
        displayValue: 'CSR heldoff',
        sort: 'desc',
        className: 'csr-heldoff',
      },
      {
        key: 'percentBagsScan',
        displayValue: '% bags scanned on',
        sort: 'desc',
        className: 'bags-scanned-on',
      },
    ];
    component.tableHeaders = headers;
    const service = TestBed.inject(FlightViewService);
    const getAssignedFlightsDataSpy = spyOn(
      service,
      'getFlightsDataByScreenType'
    ).and.callFake(() => of(flightData as any));
    service
      .getFlightsDataByScreenType('assigned', 'abc', 'ORG', '2023-10-04','2023-10-10')
      .subscribe((data) => {
        expect(data).toEqual(flightData as any);
      });
    component.getAssignedFlightsData('2023-10-04','2023-10-10');
    expect(getAssignedFlightsDataSpy).toHaveBeenCalled();
    flush();
  }));
  it('should call assigned function', () => {
    component.ngOnInit();
    component.onSelectedTabChanged({ index: 0 } as any);
    expect(component.closedFlightTab).toEqual(false);
  });
  it('should call closed function', fakeAsync(() => {
    component.onSelectedTabChanged({ index: 2 } as any);
    flush();
    expect(component.closedFlightTab).toEqual(true);
  }));
  it('should run timeout callback with delay after call tick with millis', fakeAsync(() => {
    component.getAssignedFlightsData('2023-10-04','2023-10-10');
    component.loading = true;
    setTimeout(() => {
      component.loading = true;
    }, 100);
    tick(100);
    expect(component.loading).toBe(true);
  }));

  it('should be store selected flight data localstorage for summurized screen ', () => {
    let flightData = {
      statusCode: 200,
      message: 'Success',
      responseList: [
        {
          flightKey: 'UA343:20230121:ORD',
          localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
          utcEstimatedDepartureDate: '2023-01-21T17:05:00Z',
          arrivalStation: 'SFO',
          departureDate: '2023-01-21',
          userId: 'V847944',
          carrierCode: 'UA',
          route: 'ORD - SFO',
          flightNumber: '420',
        },
        {
          flightKey: 'CA343:20230128:ORD',
          localEstimatedDepartureDate: '2023-01-24T17:45:00-06:00',
          utcEstimatedDepartureDate: '2023-01-24T17:55:00Z',
          arrivalStation: 'ORD',
          departureDate: '2024-11-21',
          userId: 'N847944',
          carrierCode: 'CA',
          route: 'ORD - SDF',
          flightNumber: '755',
        },
      ],
    };

    spyOn(service, 'getFlightsDataByScreenType').and.returnValue(
      of(flightData as any)
    );
    spyOn(router, 'navigate');
    const localStorageData =
      '{"CA343:20230128:ORD":{"selectedFlightOption":"","flightOptions":[],"currentTab":"Assigned","isSelectedFlight":false}}';
    component.allFlightsTab = false;
    component.closedFlightTab = false;
    component.getAssignedFlightsData('2023-10-04','2023-10-10');
    component.onFlightClick('CA343:20230128:ORD');
    expect(localStorage.getItem(LocalStorageKeys.SelectedFlights)).toEqual(
      localStorageData
    );
  });

  it('should update flight detail when aws query get result', () => {
    const mockDdata = {
      statusCode: 200,
      message: 'Success',
      responseList: [
        {
          flightKey: 'UA420:20230121:ORD',
          localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
          utcEstimatedDepartureDate: '07:45 (-01:12:55)',
          departureGate: 'E2',
          status: 'ON-TIME',
          arrivalStation: 'SFO',
          departureDate: '2023-01-21',
          userId: 'V847944',
          totalConxBags: 2,
          totalNotScannedBags: 1,
          totalPaxwithBagsNotBoarded: 6,
          totalPercentageOfScannedBags: '10%',
          totalNeedToOffLoad: 2,
          isAssigned: 1,
          flightNumber: '420',
          totalUnknownPaxStatus: 3,
          totalAttemptedScan: 3,
          totalAutoHeldOff: 7,
          totalCSRHeldOff: 7,
          totalBagsIssued: 2,
          totalBagsScanned: 1,
          assignedTo: ['Abburi, Sai Nikhil, Gujjula, Praveen'],
          carrierCode: 'UA',
          route: 'IAH - HYD',
          bagTagNumber: 1000,
        },
      ],
    };
    spyOn(service, 'getFlightsDataByScreenType').and.returnValue(
      of(mockDdata as any)
    );
    component.allFlightsTab = false;
    component.closedFlightTab = false;
    component.getAssignedFlightsData('2023-10-04','2023-10-10');
    component.updateFflightDetail({
      flightKey: 'UA420:20230121:ORD',
      localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
      utcEstimatedDepartureDate: '07:45 (-01:12:55)',
      departureGate: 'E2',
      status: 'ON-TIME',
      arrivalStation: 'SFO',
      departureDate: '2023-01-21',
      userId: 'V847944',
      totalConxBags: 2,
      totalNotScannedBags: 1,
      totalPaxwithBagsNotBoarded: 6,
      totalPercentageOfScannedBags: 10,
      totalNeedToOffLoad: 2,
      isAssigned: 1,
      flightNumber: '420',
      totalUnknownPaxStatus: 3,
      totalAttemptedScan: 3,
      totalAutoHeldOff: 7,
      totalCSRHeldOff: 7,
      totalBagsIssued: 2,
      totalBagsScanned: 1,
      assignedTo: ['Abburi, Sai Nikhil, Gujjula, Praveen'],
      carrierCode: 'UA',
      route: 'IAH - HYD',
      bagTagNumber: '1000',
    } as any);

    expect(component.flightDetailsData[0].totalBagsIssued).toBe(4);
    expect(component.flightDetailsData[0].totalAutoHeldOff).toBe(14);
    expect(component.flightDetailsData[0].totalPercentageOfScannedBags).toBe(
      '20 %'
    );
  });
  it('should call makeListeners, refreshFlightFilterGridData function and get closed flight array', fakeAsync(() => {
    const closedFlightArr = [
      {
        flightKey: 'UA8833:20230227:ORD',
        localEstimatedDepartureDate: '2023-02-27T11:05:00',
        etd: '2023-02-27T11:05:00',
        departureGate: 'C4',
        status: 'DELAYED',
        arrivalStation: 'CAO',
        departureDate: '2023-02-27',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 4,
        totalPaxwithBagsNotBoarded: 5,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 6,
        isAssigned: 1,
        flightNumber: '8833',
        totalUnknownPaxStatus: 2,
        totalAttemptedScan: 3,
        totalAutoHeldOff: 7,
        totalCSRHeldOff: 8,
        totalBagsIssued: 1,
        totalBagsScanned: 2,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '27',
        newDepartureDate: 'February 27',
      },
      {
        flightKey: 'UA9933:20230227:ORD',
        localEstimatedDepartureDate: '2023-02-27T11:05:00',
        etd: '2023-02-27T11:05:00',
        departureGate: 'C4',
        status: 'DELAYED',
        arrivalStation: 'CAO',
        departureDate: '2023-02-27',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 4,
        totalPaxwithBagsNotBoarded: 5,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 6,
        isAssigned: 1,
        flightNumber: '9933',
        totalUnknownPaxStatus: 2,
        totalAttemptedScan: 3,
        totalAutoHeldOff: 7,
        totalCSRHeldOff: 8,
        totalBagsIssued: 1,
        totalBagsScanned: 2,
        isNote: true,
        carrierCode: 'UA',
        route: 'DFW - HYD',
        date: '27',
        newDepartureDate: 'February 27',
      },
      {
        flightKey: 'UA7733:20230227:ORD',
        localEstimatedDepartureDate: '2023-02-27T11:05:00',
        etd: '2023-02-27T11:05:00',
        departureGate: 'C4',
        status: 'DELAYED',
        arrivalStation: 'CAO',
        departureDate: '2023-02-27',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 4,
        totalPaxwithBagsNotBoarded: 5,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 6,
        isAssigned: 1,
        flightNumber: '7733',
        totalUnknownPaxStatus: 2,
        totalAttemptedScan: 3,
        totalAutoHeldOff: 7,
        totalCSRHeldOff: 8,
        totalBagsIssued: 1,
        totalBagsScanned: 2,
        isNote: false,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '27',
        newDepartureDate: 'February 27',
      },
      {
        flightKey: 'UA8833:20230225:ORD',
        localEstimatedDepartureDate: '2023-02-25T11:05:00',
        etd1: '12:45',
        departureGate: 'C2',
        status: 'DELAYED',
        arrivalStation: 'SFO',
        departureDate: '2023-02-25',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 3,
        totalPaxwithBagsNotBoarded: 4,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 5,
        isAssigned: 1,
        flightNumber: '8833',
        totalUnknownPaxStatus: 6,
        totalAttemptedScan: 7,
        totalAutoHeldOff: 8,
        totalCSRHeldOff: 2,
        totalBagsIssued: 1,
        totalBagsScanned: 6,
        isNote: true,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '25',
        newDepartureDate: 'February 25',
        etd: '2023-02-25T11:05:00',
      },
      {
        flightKey: 'UA5533:20230212:ORD',
        localEstimatedDepartureDate: '2023-02-12T07:05:00',
        etd1: '09:45',
        departureGate: 'C6',
        status: 'DELAYED',
        arrivalStation: 'SFO',
        departureDate: '2023-02-12',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 3,
        totalPaxwithBagsNotBoarded: 4,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 5,
        isAssigned: 1,
        flightNumber: '5533',
        totalUnknownPaxStatus: 6,
        totalAttemptedScan: 7,
        totalAutoHeldOff: 8,
        totalCSRHeldOff: 2,
        totalBagsIssued: 1,
        totalBagsScanned: 6,
        isNote: false,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '12',
        newDepartureDate: 'February 12',
        etd: '2023-02-12T07:05:00',
      },
      {
        flightKey: 'UA7777:20230214:ORD',
        localEstimatedDepartureDate: '2023-02-14T08:05:00',
        etd1: '12:45',
        departureGate: 'C4',
        status: 'DELAYED',
        arrivalStation: 'IHA',
        departureDate: '2023-02-14',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 6,
        totalPaxwithBagsNotBoarded: 7,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 8,
        isAssigned: 1,
        flightNumber: '7777',
        totalUnknownPaxStatus: 8,
        totalAttemptedScan: 1,
        totalAutoHeldOff: 3,
        totalCSRHeldOff: 6,
        totalBagsIssued: 5,
        totalBagsScanned: 6,
        isNote: false,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '14',
        newDepartureDate: 'February 14',
        etd: '2023-02-14T08:05:00',
      },
      {
        flightKey: 'UA3433:20230211:ORD',
        localEstimatedDepartureDate: '2023-02-11T06:18:00',
        etd1: '11:45',
        departureGate: 'C7',
        status: 'DELAYED',
        arrivalStation: 'DFW',
        departureDate: '2023-02-11',
        userId: 'V847944',
        totalConxBags: 1,
        totalNotScannedBags: 5,
        totalPaxwithBagsNotBoarded: 5,
        totalPercentageOfScannedBags: '100%',
        totalNeedToOffLoad: 0,
        isAssigned: 1,
        flightNumber: '3433',
        totalUnknownPaxStatus: 3,
        totalAttemptedScan: 2,
        totalAutoHeldOff: 0,
        totalCSRHeldOff: 2,
        totalBagsIssued: 5,
        totalBagsScanned: 1,
        isNote: false,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        date: '11',
        newDepartureDate: 'February 11',
        etd: '2023-02-11T06:18:00',
      },
    ];
    component.ngOnInit();
    component.makeListeners();
    sharedDataService.refreshFlightFilterGridData.next(true);
    sharedDataService.refreshFlightFilterGridData.subscribe((data) => {
      expect(data).toBe(true);
      component.getAssignedFlightsData('2023-10-04','2023-10-10');
    });
    //sharedDataService.closedFlightsArr.next(closedFlightArr);
    sharedDataService.closedFlightsArr.subscribe((data) => {
      expect(data.length).toBe(1);
    });
    tick(10000);
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should be on Error selectedFligthData should be blank array', () => {
    spyOn(service, 'getFlightsDataByScreenType').and.returnValue(
      throwError({ error: { message: 'Record Not Found' } })
    );
    component.allFlightsTab = false;
    component.closedFlightTab = false;
    component.getAssignedFlightsData('UA777', 'UA888');
    expect(component.flightDetailsData?.length).toBe(0);
  });

  it('should call allFlightLength and get allFlight array function', fakeAsync(() => {
    const allFlights = [
      {
        flightKey: 'UA1234:20230313:ORD',
        flightNumber: '1234',
        localEstimatedDepartureDate: '2023-03-13T16:47:00-06:00',
        utcEstimatedDepartureDate: '2023-03-13T16:20:00',
        departureGate: 'B2',
        status: 'DELAYED',
        arrivalStation: 'EWR',
        departureDate: '2023-03-13',
        userId: ['V857797:PPBM', 'V857798:PPBM'],
        assignedTo: ['Praveen', 'Praveen'],
        totalConxBags: 0,
        totalNotScannedBags: 1,
        totalPaxwithBagsNotBoarded: 20,
        totalPercentageOfScannedBags: '',
        totalNeedToOffLoad: 0,
        totalUnknownPaxStatus: 18,
        totalAttemptedScan: 0,
        totalAutoHeldOff: 0,
        totalCSRHeldOff: 0,
        totalBagsIssued: 22,
        totalBagsScanned: 0,
        isAssigned: null,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        id: 2,
        flightDayDate: '13',
      },
      {
        flightKey: 'UA944:20230222:ORD',
        flightNumber: '944',
        localEstimatedDepartureDate: '2023-03-05T19:35:00-06:00',
        utcEstimatedDepartureDate: '2023-03-05T19:35:00',
        departureGate: 'B1',
        status: 'ON-TIME',
        arrivalStation: 'ORD',
        departureDate: '2023-02-22',
        userId: ['V857797:PPBM'],
        assignedTo: ['Praveen'],
        totalConxBags: 1,
        totalNotScannedBags: 6,
        totalPaxwithBagsNotBoarded: 7,
        totalPercentageOfScannedBags: '99%',
        totalNeedToOffLoad: 0,
        totalUnknownPaxStatus: 0,
        totalAttemptedScan: 0,
        totalAutoHeldOff: 0,
        totalCSRHeldOff: 0,
        totalBagsIssued: 7,
        totalBagsScanned: 0,
        isAssigned: null,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        id: 0,
        flightDayDate: '22',
      },
      {
        flightKey: 'UA2138:20230222:ORD',
        flightNumber: '2138',
        localEstimatedDepartureDate: '2023-02-22T17:45:00-06:00',
        utcEstimatedDepartureDate: '2023-02-22T23:45:00Z',
        departureGate: 'B2',
        status: 'CLOSED',
        arrivalStation: 'EWR',
        departureDate: '2023-02-22',
        userId: ['V857797:PPBM', 'V857798:PPBM'],
        assignedTo: ['Praveen', 'Praveen'],
        totalConxBags: 0,
        totalNotScannedBags: 1,
        totalPaxwithBagsNotBoarded: 20,
        totalPercentageOfScannedBags: '',
        totalNeedToOffLoad: 0,
        totalUnknownPaxStatus: 18,
        totalAttemptedScan: 0,
        totalAutoHeldOff: 0,
        totalCSRHeldOff: 0,
        totalBagsIssued: 22,
        totalBagsScanned: 0,
        isAssigned: null,
        carrierCode: 'UA',
        route: 'ORD - SFO',
        id: 1,
        flightDayDate: '22',
      },
    ];
    component.ngOnInit();
    component.makeListeners();
    sharedDataService.allFlightsLength.next(allFlights);
    sharedDataService.allFlightsLength.subscribe((data) => {
      expect(data.length).toBe(1);
    });
    tick(10000);
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
  it('should call openAddFlightsModal function to open modal', fakeAsync(() => {
    component.ngOnInit();
    component.openAddFlightsModal();
    tick(10000);
    fixture.detectChanges();
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
  it('should call updateFlightBaggedDetail function to subscribe flightDdetail array', fakeAsync(() => {
    const flightBagDetail = {
      flightKey: 'UA420:20230121:ORD',
      localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
      utcEstimatedDepartureDate: '07:45 (-01:12:55)',
      departureGate: 'E2',
      flightStatus: 'ON-TIME',
      aircraftType: 'biubg',
      arrivalStation: 'SFO',
      departureDate: '2023-01-21',
      userId: 'V847944',
      totalConxBags: 2,
      totalNotScannedBags: 1,
      totalPaxwithBagsNotBoarded: 6,
      totalPercentageOfScannedBags: '10',
      totalNeedToOffLoad: 2,
      isAssigned: 1,
      flightNumber: '420',
      totalUnknownPaxStatus: 3,
      totalAttemptedScan: 3,
      totalAutoHeldOff: 7,
      totalCSRHeldOff: 7,
      totalBagsIssued: 2,
      totalBagsScanned: 1,
      assignedTo: ['Abburi, Sai Nikhil, Gujjula, Praveen'],
      bagTagNumber: '1000',
    };
    sharedDataService.updateFlightBaggedDetail.next(flightBagDetail);
    component.updateFflightDetail(flightBagDetail);
    tick(10000);
    fixture.detectChanges();
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
  it('should call updateFlightFilterGridData function', fakeAsync(() => {
    let flightFilterData = [
      {
        flightKey: 'UA420:20230121:ORD',
        localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
        utcEstimatedDepartureDate: '07:45 (-01:12:55)',
        departureGate: 'E2',
        flightStatus: 'ON-TIME',
        aircraftType: 'biubg',
        arrivalStation: 'SFO',
        departureDate: '2023-01-21',
        userId: 'V847944',
        totalConxBags: 2,
        totalNotScannedBags: 1,
        totalPaxwithBagsNotBoarded: 6,
        totalPercentageOfScannedBags: '10',
        totalNeedToOffLoad: 2,
        isAssigned: 1,
        flightNumber: '420',
        totalUnknownPaxStatus: 3,
        totalAttemptedScan: 3,
        totalAutoHeldOff: 7,
        totalCSRHeldOff: 7,
        totalBagsIssued: 2,
        totalBagsScanned: 1,
        assignedTo: ['Abburi, Sai Nikhil, Gujjula, Praveen'],
        bagTagNumber: '1000',
      },
      {
        flightKey: 'UA520:20230121:ORD',
        localEstimatedDepartureDate: '2023-01-21T11:05:00-06:00',
        utcEstimatedDepartureDate: '07:45 (-01:12:55)',
        departureGate: 'E2',
        flightStatus: 'ON-TIME',
        aircraftType: 'biubg',
        arrivalStation: 'SFO',
        departureDate: '2023-01-21',
        userId: 'V847944',
        totalConxBags: 2,
        totalNotScannedBags: 1,
        totalPaxwithBagsNotBoarded: 6,
        totalPercentageOfScannedBags: '10',
        totalNeedToOffLoad: 2,
        isAssigned: 1,
        flightNumber: '520',
        totalUnknownPaxStatus: 3,
        totalAttemptedScan: 3,
        totalAutoHeldOff: 7,
        totalCSRHeldOff: 7,
        totalBagsIssued: 2,
        totalBagsScanned: 1,
        assignedTo: ['Abburi, Sai Nikhil, Gujjula, Praveen'],
        bagTagNumber: '1000',
      },
    ];
    component.flightsArr = [];
    sharedDataService.updateFlightFilterGridData.next(flightFilterData);
    component.loadFlightGridData(flightFilterData);
    tick(10000);
    fixture.detectChanges();
    flush();
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});