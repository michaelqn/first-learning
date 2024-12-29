
import { FlightViewService } from './../shared/services/flight-view.service';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PpbmAddModalComponent } from '../ppbm-add-modal/ppbm-add-modal.component';
import { SharedDataService } from '../shared/services/shared-data-service';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightDetails } from '../shared/interfaces/flight-details.interface';
import { PPBMFlightsScreenType } from '../shared/models/ppbm-flights.model';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '../shared/models/localstorage-keya.enum';
import { FlightsInterface } from '../shared/interfaces/add-flight.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BaggageDetailsService } from '../shared/services/baggage-details.service';
import { AppConfigService } from '../shared/services/app-config/app-config.service';
import * as moment from 'moment';

@Component({
  selector: 'ppbm-flights-component',
  templateUrl: './ppbm-flights.component.html',
  styleUrls: ['./ppbm-flights.component.scss'],
})
export class PpbmFlightsComponent implements OnInit, OnDestroy {
  bsValue: any;
  minDate: any;
  maxDate: any;
  datesDisabled: any;
  selectedDate = '';
  bsConfig: any;
  disabledDates: any;
  selectedDateVal = '';
  stationLocalTime: string;
  flightDetailsData: any = [];
  isLargeScreen = false;
  isMediumScreen = false;
  isMobileScreen = false;
  todayDate: Date = new Date();
  flightsArr: any;
  noDataText = '--';
  loading = false;
  closedFlightTab = false;
  allFlightsTab = false;
  closedFlightArray: any;
  allFLightsLength: any;
  selectedTabIndex = 0;
  timerSubscription: Subscription | undefined;
  stationSubscription: Subscription | undefined;
  subscription: Subscription;
  refreshData: Subscription | undefined;
  env: any = environment;
  autoUpdateTimeInterval: any = 1000 * 60 * 1; // = 1 min (millisecs * secs * mins)
  tableHeaders = [
    {
      key: 'flightNumber',
      displayValue: 'Flight #',
      sort: 'desc',
      className: 'flight-number',
    },
    {
      key: 'departureGate',
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
    {
      key: 'arrivalStation',
      displayValue: 'Dest',
      sort: 'desc',
      className: 'dest',
    },
    {
      key: 'totalBagsIssued',
      displayValue: 'Bags issued',
      sort: 'desc',
      className: 'bags-issued',
    },
    {
      key: 'totalConxBags',
      displayValue: 'Conx bags',
      sort: 'desc',
      className: 'conx-bags',
    },
    {
      key: 'totalBagsScanned',
      displayValue: 'Bags scanned',
      sort: 'desc',
      className: 'bags-scanned',
    },
    {
      key: 'totalNotScannedBags',
      displayValue: 'Bags not scanned',
      sort: 'desc',
      className: 'bags-not-scanned',
    },
    {
      key: 'totalPaxwithBagsNotBoarded',
      displayValue: 'Pax w bags not boarded',
      sort: 'desc',
      className: 'pax-not-boarded',
    },
    {
      key: 'totalUnknownPaxStatus',
      displayValue: 'Unknown pax stat',
      sort: 'desc',
      className: 'unknown-pax-stat',
    },
    {
      key: 'totalAttemptedScan',
      displayValue: 'Attempted scan',
      sort: 'desc',
      className: 'attempted-scan',
    },
    {
      key: 'totalNeedToOffLoad',
      displayValue: 'Need to offload',
      sort: 'desc',
      className: 'need-to-offload',
    },
    {
      key: 'totalAutoHeldOff',
      displayValue: 'Auto heldoff',
      sort: 'desc',
      className: 'auto-heldoff',
    },
    {
      key: 'totalCSRHeldOff',
      displayValue: 'CSR heldoff',
      sort: 'desc',
      className: 'csr-heldoff',
    },
    {
      key: 'totalPercentageOfScannedBags',
      displayValue: '% bags scanned on',
      sort: 'desc',
      className: 'bags-scanned-on',
    },
  ];
  previousSortOrder = {
    key: 'etd',
    displayValue: 'ETD',
    sort: 'desc',
    className: 'etd',
  };
  userID: string;
  currentTabKey = 'currentFLightDetailTab';
  subscriptionFlights: string[] = [];
  data: Date;
  minPDate: any;
  maxPDate: any;
  minCDate: any;
  selectedOpendata: Date;
  selectedOpenDate: string;
  selectedOpenDateVal: string;
  maxCDate: any;
  date: Date;
  dateTimeSelect: string;
  startDateTime: string;
  endDateTime: string;
  userSelectedDays: { startDateTime: string; endDateTime: string };
  selectedTodayDate: string;
  currentTab: string | null;
  bsRangeValue: any;
  dpc: any;
  offset: number;
  constructor(
    private sharedDataService: SharedDataService,
    private flightViewService: FlightViewService,
    private baggageDetailsService: BaggageDetailsService,
    protected modalService: NgbModal,
    private router: Router,
    private config: AppConfigService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.initializeCalender();
    this.initialization();
    this.getScreenType();
    if (this.selectedTabIndex === 0) {
      this.getAssignedFlightsData('', '');
      this.makeListeners();
    }
    this.selectedDateVal = this.flightViewService.getSelectedDate();
    if (this.selectedDateVal) {
      this.onValueChange(new Date(this.selectedDateVal));
    }
    this.stationSubscription =
      this.sharedDataService.userSelectedStation.subscribe((closedFlights) => {
        this.flightViewService
          .getFlightsDataByScreenType(
            PPBMFlightsScreenType.AllFlights,
            this.userID,
            closedFlights,
            this.startDateTime,
            this.endDateTime
          )
          .subscribe(
            (result: any) => {
              this.allFLightsLength = result.responseList.length;
            },
            (error) => {
              this.allFLightsLength = '';
            }
          );
        this.flightViewService
          .getFlightsDataByScreenType(
            PPBMFlightsScreenType.AssignedFlights,
            this.userID,
            closedFlights,
            this.startDateTime,
            this.endDateTime
          )
          .subscribe(
            (result: any) => {
              this.flightDetailsData = result.responseList;
              this.loadFlightGridData(this.flightDetailsData);
            },
            (error) => {
              this.flightDetailsData = [];
            }
          );
      });
  }
  initializeCalender() {
    this.data = moment(this.stationLocalTime).toDate();
    this.selectedOpendata = moment(this.stationLocalTime).toDate();
    this.selectedDate = this.data.toString();
    this.selectedOpenDate = this.selectedOpendata.toString();
    this.selectedOpenDateVal = 'Today';
    this.maxCDate = moment(this.stationLocalTime).toDate();
    this.minPDate = moment(this.stationLocalTime).toDate();

    const prevMonthStartDate = moment(this.stationLocalTime)
      .subtract(1, 'months')
      .startOf('month')
      .toDate();
    const prevMonthEndDate = moment(this.stationLocalTime)
      .subtract(1, 'months')
      .endOf('month')
      .toDate();
    const prevMonthOpenDays = 31 - moment(this.stationLocalTime).date();
    this.maxPDate = prevMonthEndDate;

    if (prevMonthOpenDays > 0) {
      if (prevMonthOpenDays <= parseInt(moment(this.maxPDate).format('DD'))) {
        this.minPDate = moment(this.maxPDate)
          .subtract(prevMonthOpenDays - 1, 'days')
          .toDate();
      } else {
        this.minPDate = prevMonthStartDate;
      }
    }

    let todayDate = moment(this.stationLocalTime).toDate();
    let todayDateM = todayDate.getMonth() + 1;
    let minPDateM = this.minPDate.getMonth() + 1;
    if (todayDateM > minPDateM) {
      let minPDateY = this.minPDate.getFullYear();
      let lastDateofPM = new Date(minPDateY, minPDateM, 0).getDate();
      let today = moment(this.stationLocalTime).toDate();
      this.minCDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else {
      let today = moment(this.stationLocalTime).toDate();
      this.minCDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
  }
  showDatePicker(dpp: any, dpc: any) {
    dpp.show();
    dpc.show();
  }

  onValueChange(value: Date, dpp?: any, dpc?: any, calendarPanel?: any): void {
    this.flightViewService.setSelectedDate(value.toDateString());
    this.startDateTime = value.toISOString();
    this.startDateTime = `${moment(this.startDateTime).format(
      'YYYY-MM-DDT00:00:00'
    )}Z`;
    this.endDateTime = `${this.startDateTime.slice(0, 10)}T23:59:59Z`;
    this.offset = Number(localStorage.getItem('offset'));
    let startTimeFmt;
    let endTimeFmt;
    if (this.offset > 0) {
      startTimeFmt = moment(this.startDateTime)
        .subtract(Math.abs(this.offset), 'm')
        .toDate()
        .setSeconds(0);
      endTimeFmt = moment(this.endDateTime)
        .subtract(Math.abs(this.offset), 'm')
        .toDate()
        .setSeconds(59);
    } else {
      startTimeFmt = moment(this.startDateTime)
        .add(Math.abs(this.offset), 'm')
        .toDate()
        .setSeconds(0);
      endTimeFmt = moment(this.endDateTime)
        .add(Math.abs(this.offset), 'm')
        .toDate()
        .setSeconds(59);
    }
    this.startDateTime = moment(startTimeFmt).toISOString().split('.')[0] + 'Z';
    this.endDateTime = moment(endTimeFmt).toISOString().split('.')[0] + 'Z';
    localStorage.setItem('startDateTime', this.startDateTime);
    localStorage.setItem('endDateTime', this.endDateTime);

    let userSelectedDays = {
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
    };
    this.flightViewService.setCloseSelectedDate(userSelectedDays);
    this.sharedDataService.closedFlightsArrDatePicker.next(userSelectedDays);
    this.currentTab = localStorage.getItem(this.currentTabKey);
    this.todayDate = moment(this.stationLocalTime).toDate();
    this.data = value;
    this.selectedDate = this.data.toString();
    this.selectedTodayDate = localStorage.getItem(
      'todayDateSelected'
    ) as string;
    if (this.todayDate.toDateString() == this.data.toDateString()) {
      this.selectedDateVal = 'Today';
    } else {
      this.selectedDateVal = '';
    }
    dpp?.hide();
    dpc?.hide();
  }
  @HostListener('window:popstate', ['$event'])
  initialization(): void {
    const localStorageUserData = localStorage.getItem('userProfile');
    const userProfile = localStorageUserData
      ? JSON.parse(localStorageUserData || '')
      : '';
    const currentTab = localStorage.getItem(this.currentTabKey);
    localStorage.removeItem(LocalStorageKeys.SelectedFlights);
    this.userID = userProfile?.['preferredUsername'] || '';
    if (currentTab === PPBMFlightsScreenType.AllFlights) {
      this.allFlights();
      this.selectedTabIndex = 1;
    } else if (currentTab === PPBMFlightsScreenType.ClosedFlights) {
      this.closed();
      this.selectedTabIndex = 2;
    }
  }

  makeListeners(): void {
    this.subscription.add(
      this.sharedDataService.closedFlightsArr.subscribe((closedFlights) => {
        if (closedFlights) {
          this.closedFlightArray = 0;
          closedFlights.responseList.map((item: any) => {
            this.closedFlightArray += item.list.length;
          });
        } else {
          this.closedFlightArray = '';
        }
      })
    );

    this.subscription.add(
      this.sharedDataService.userSelectedStation.subscribe(
        (selectedStation) => {
          if (!this.closedFlightTab && !this.allFlightsTab) {
            this.getAssignedFlightsData('', '');
          }
        }
      )
    );

    this.subscription.add(
      this.sharedDataService.allFlightsLength.subscribe((allFLights) => {
        if (allFLights) {
          this.allFLightsLength = allFLights.length;
        }
      })
    );

    this.timerSubscription = interval(this.autoUpdateTimeInterval).subscribe(
      () => {
        if (!this.closedFlightTab && !this.allFlightsTab) {
          this.getAssignedFlightsData('', '');
        }
      }
    );

    this.subscription.add(
      this.sharedDataService.refreshFlightFilterGridData.subscribe(
        (loadGrid) => {
          if (loadGrid) {
            this.timerSubscription?.unsubscribe();
            this.getAssignedFlightsData('', '');
          }
        }
      )
    );
    this.subscription.add(
      this.sharedDataService.updateFlightFilterGridData.subscribe(
        (flightDetails: Array<FlightDetails>) => {
          if (flightDetails) {
            this.loadFlightGridData(flightDetails);
          }
        }
      )
    );

    this.subscription.add(
      this.sharedDataService.updateFlightBaggedDetail.subscribe(
        (flightDdetail: FlightDetails) => {
          if (flightDdetail) {
            this.updateFflightDetail(flightDdetail);
          }
        }
      )
    );
  }

  updateFflightDetail(flightDetail: FlightDetails): void {
    const updatedFflight = this.flightDetailsData?.find(
      (detail: any) => detail.flightKey === flightDetail.flightKey
    );
    if (updatedFflight) {
      updatedFflight.totalBagsIssued += flightDetail.totalBagsIssued;
      updatedFflight.totalConxBags += flightDetail.totalConxBags;
      updatedFflight.totalBagsScanned += flightDetail.totalBagsScanned;
      updatedFflight.totalNotScannedBags += flightDetail.totalNotScannedBags;
      updatedFflight.totalPaxwithBagsNotBoarded +=
        flightDetail.totalPaxwithBagsNotBoarded;
      updatedFflight.totalUnknownPaxStatus +=
        flightDetail.totalUnknownPaxStatus;
      updatedFflight.totalAttemptedScan += flightDetail.totalAttemptedScan;
      updatedFflight.totalNeedToOffLoad += flightDetail.totalNeedToOffLoad;
      updatedFflight.totalAutoHeldOff += flightDetail.totalAutoHeldOff;
      updatedFflight.totalCSRHeldOff += flightDetail.totalCSRHeldOff;
      if (updatedFflight.totalPercentageOfScannedBags === null) {
        updatedFflight.totalPercentageOfScannedBags = '0 %';
      }
      const updateFflightDetailPper =
        +updatedFflight.totalPercentageOfScannedBags?.split('%')[0];
      updatedFflight.totalPercentageOfScannedBags = `${
        flightDetail.totalPercentageOfScannedBags + updateFflightDetailPper
      } %`;
    }
  }

  getScreenType() {
    this.sharedDataService.screenTypeChange.subscribe((data) => {
      this.isLargeScreen = data.isLargeScreen;
      this.isMediumScreen = data.isMediumScreen;
      this.isMobileScreen = data.isMobileScreen;
    });
  }
  getAssignedFlightsData(startDateTime: any, endDateTime: any) {
    this.loading = true;
    this.flightsArr = [];
    let screenType = PPBMFlightsScreenType.AssignedFlights;
    this.flightViewService
      .getFlightsDataByScreenType(
        screenType,
        this.userID,
        localStorage.getItem('stationCode') || '',
        startDateTime,
        endDateTime
      )
      .subscribe(
        (result: any) => {
          this.flightDetailsData = result.responseList?.filter(
            (flights: FlightDetails) => flights.isAssigned
          );
          this.flightDetailsData?.map(
            (value: FlightsInterface, index: number) => {
              const flightObject = {
                flightDayDate: this.flightDetailsData[index].flightKey
                  ?.split(':')[1]
                  .slice(6)
                  .trim(),
              };
              value.id = index;
              value.flightDayDate = flightObject.flightDayDate;
            }
          );
          sessionStorage.setItem(
            'flightDetailsData',
            JSON.stringify(this.flightDetailsData)
          );
          localStorage.setItem(
            'getFlightsData',
            JSON.stringify(this.flightDetailsData)
          );
          this.loadFlightGridData();
        },
        (error) => {
          if (error?.error?.message === 'Record Not Found') {
            this.flightsArr = [];
            this.flightDetailsData = [];
            localStorage.setItem(
              'getFlightsData',
              JSON.stringify(this.flightDetailsData)
            );
            sessionStorage.setItem(
              'flightDetailsData',
              JSON.stringify(this.flightDetailsData)
            );
          }
        }
      );
  }
  loadFlightGridData(flightData?: Array<FlightDetails>) {
    if (flightData) {
      this.flightDetailsData = flightData;
    }
    if (this.flightDetailsData && this.flightDetailsData.length > 0) {
      for (let item of this.flightDetailsData) {
        this.flightsArr.push(item.flightNumber);
      }
      this.flightDetailsData.forEach((flightDetail: any) => {
        flightDetail.date = flightDetail.flightKey.split(':')[1].slice(6, 8);
        flightDetail.etd = flightDetail.localEstimatedDepartureDate;
        const flightEligibleForSubscription =
          (flightDetail.status !== 'CNCLD' && !flightDetail?.flightOff) ||
          flightDetail.status == 'CNCLD' ||
          flightDetail.flightOff;
        if (
          this.config.appsync_enable &&
          flightDetail.flightKey &&
          flightEligibleForSubscription &&
          !this.subscriptionFlights.includes(flightDetail?.flightKey)
        ) {
          this.subscriptionFlights?.push(flightDetail?.flightKey);
          this.flightViewService.appSyncSubscribeToFlightUpdates(
            flightDetail.flightKey
          );
          this.flightViewService.appSyncSubscribeToFlightBagSummary(
            flightDetail.flightKey
          );
        }
      });
      this.flightDetailsData.sort((a: any, b: any) =>
        a.utcEstimatedDepartureDate.localeCompare(b.utcEstimatedDepartureDate)
      );
      this.sharedDataService.assignedFlightFlag.next(true);
      this.sharedDataService.updateRefreshTime.next(true);
      this.loading = false;
      const sortDiv = <HTMLElement>(
        document.querySelector(`.${this.previousSortOrder.className}`)
      );
      Array.from(document.querySelectorAll('th > i')).forEach((tag: any) => {
        tag.classList.add('hide-element');
      });
      if (sortDiv) {
        const iTag = sortDiv.getElementsByTagName('i')[0];
        if (iTag?.classList) {
          iTag.classList.remove('caret-up');
          iTag.classList.remove('caret-down');
          if (this.previousSortOrder.sort === 'asc') {
            iTag.classList.add('caret-up');
          } else {
            iTag.classList.add('caret-down');
          }
          iTag.classList.remove('hide-element');
        }
      }
    }
  }
  closed() {
    this.closedFlightTab = true;
    this.allFlightsTab = false;
    localStorage.setItem(
      this.currentTabKey,
      PPBMFlightsScreenType.ClosedFlights
    );
  }

  onSelectedTabChanged(data: MatTabChangeEvent) {
    switch (data?.index) {
      case 0:
        this.assigned();
        break;
      case 1:
        this.allFlights();
        break;
      case 2:
        this.closed();
        break;
    }
  }

  assigned() {
    this.closedFlightTab = false;
    this.allFlightsTab = false;
    localStorage.setItem(
      this.currentTabKey,
      PPBMFlightsScreenType.AssignedFlights
    );
    this.getAssignedFlightsData('', '');
    this.sharedDataService.refreshClosedTable.next(false);
  }
  allFlights() {
    this.allFlightsTab = true;
    this.closedFlightTab = false;
    localStorage.setItem(this.currentTabKey, PPBMFlightsScreenType.AllFlights);
  }
  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.subscription?.unsubscribe();
    this.stationSubscription?.unsubscribe();
  }

  openAddFlightsModal() {
    this.sharedDataService.showAddFlightsModal.next(true);
    const modalRef = this.modalService.open(PpbmAddModalComponent, {
      size: this.isMobileScreen === true ? 'sm' : 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.result.then((data) => {
      if (data) {
        this.getAssignedFlightsData('', '');
      }
    });
  }

  onFlightClick(flightKey: string): void {
    this.flightViewService.setSelectedFlightLocalStorageData(
      flightKey,
      this.flightDetailsData,
      'Assigned'
    );
    this.baggageDetailsService.appSyncSubscribeToFlightBagSummary(flightKey);
    this.router.navigate(['ppbm/summarization']);
  }
}

