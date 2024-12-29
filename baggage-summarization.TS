
import { Sort } from './../shared/directives/sort';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { PpbmAddNoteHoldLoadModalComponent } from '../ppbm-addnote-load-hold/ppbm-addnote-load-hold.component';
import {
  BaggageDetailsInterface,
  BaggageDetailsAPIInterface,
  SummrizedBaggedDetailInterface,
} from '../shared/interfaces/baggage-details.interface';
import { DropDownOptions } from '../shared/interfaces/dropdown-option.interface';
import { LocalStorageKeys } from '../shared/models/localstorage-keya.enum';
import { BaggageDetailsService } from '../shared/services/baggage-details.service';
import { FlightViewService } from '../shared/services/flight-view.service';
import { SharedDataService } from '../shared/services/shared-data-service';
import { BaggageDetailsDialogComponent } from '../baggage-details-dialog/baggage-details-dialog.component';
import { PpbmErrorDetailsComponent } from '../ppbm-error-details/ppbm-error-details.component';
import { LoadHoldService } from '../shared/services/load-hold.service';
import { AppConfigService } from 'src/app/shared/services/app-config/app-config.service';
interface SummarizationBadgeInterface {
  badgeName: string;
  badgeKey: string;
  badgeCount: number;
}

@Component({
  selector: 'ppbm-bags-summarization',
  templateUrl: './ppbm-bags-summarization.component.html',
  styleUrls: ['./ppbm-bags-summarization.component.scss'],
})
export class PpbmBagsSummarization implements OnInit, OnDestroy {
  noteUpdateInfo: any;
  baggageDetailsData: any = [];
  isLargeScreen = false;
  isMediumScreen = false;
  isMobileScreen = false;
  flightDataDropDown: any = [];
  selectedFlightListText = '';
  baggageDetails: BaggageDetailsInterface | null;
  selectedFlightKey: string;
  subscription: Subscription;
  flightKeyOption: DropDownOptions[];
  bagIssueCount = 0;
  connectionBagCount = 0;
  scannedBagCount = 0;
  missingBagCount = 0;
  paxNotBoarderdCount = 0;
  uknownPaxStatCount = 0;
  attemptedScanCount = 0;
  needToOffroadScanCount = 0;
  autoHelfoffCount = 0;
  csrHeldOffCount = 0;
  flightId: string;
  currentTab: string;
  activeBag = 'isBagIssued';
  activeBadgeName = 'Bags issued';
  activeBagCount = 0;
  badges: SummarizationBadgeInterface[];
  autoUpdateTimeInterval: any = 1000 * 60 * 1; // = 1 min (millisecs * secs * mins)
  date: any;
  carrierCode: any;
  flightNumber: any;
  route: any;
  startRoute: any;
  endRoute: any;
  baggageDetailsList: SummrizedBaggedDetailInterface[] = [];
  copyBaggageDetailsList: SummrizedBaggedDetailInterface[] = [];
  displayBagContent = false;
  noDataText = '--';
  timerSubscription: Subscription | undefined;
  btnLoad = false;
  disabledLoadBtn = true;
  disabledHoldBtn = true;
  disabledAddNoteBtn = true;
  btnHold = false;
  btnAddNote = false;
  isChecked = false;
  count = 0;
  tableHeaders = [
    {
      key: 'pbOn',
      displayValue: 'P/B',
      sort: 'asc',
      className: 'pb-on',
    },
    {
      key: 'bagTagNumber',
      displayValue: 'Bag Tag #',
      sort: 'desc',
      className: 'bag-tag-number',
    },
    {
      key: 'storageId',
      displayValue: 'Bag status',
      sort: 'desc',
      className: 'bags-status',
    },
    {
      key: 'type',
      displayValue: 'Type',
      sort: 'desc',
      className: 'type',
    },
    {
      key: 'bagConxTime',
      displayValue: 'Bag conx time',
      sort: 'desc',
      className: 'bag-conx-time',
    },
    {
      key: 'paxConxTime',
      displayValue: 'Pax conx time',
      sort: 'desc',
      className: 'pax-conx-time',
    },
    {
      key: 'loadStatus',
      displayValue: '',
      sort: 'desc',
      className: 'load-status',
    },
    {
      key: 'loadStatus',
      displayValue: 'Load status',
      sort: 'desc',
      className: 'load-status',
    },
    {
      key: 'lastStatus',
      displayValue: 'Last status',
      sort: 'desc',
      className: 'last-status',
    },
    {
      key: 'lastScanBy',
      displayValue: 'Last scan time',
      sort: 'desc',
      className: 'last-scan-time',
    },
    {
      key: 'passengerLastName',
      displayValue: 'Pax name',
      sort: 'desc',
      className: 'pax-name',
    },
    {
      key: 'pnr',
      displayValue: 'PNR',
      sort: 'desc',
      className: 'pnr',
    },
    {
      key: 'paxStatusAndSeat',
      displayValue: 'Pax status / seat',
      sort: 'desc',
      className: 'awaiting-seat',
    },
  ];
  previousSortOrder = {
    key: 'pbOn',
    displayValue: 'P/B on',
    sort: 'asc',
    className: 'pb-on',
  };
  loading = false;
  isBaggedDetailDialogOpened = false;
  currentBagDetail: SummrizedBaggedDetailInterface | null;

  constructor(
    private sharedDataService: SharedDataService,
    private baggageDetailsService: BaggageDetailsService,
    private router: Router,
    private activtedRouter: ActivatedRoute,
    private flightViewService: FlightViewService,
    private sort: Sort,
    private loadHoldService: LoadHoldService,
    protected modalService: NgbModal,
    private config: AppConfigService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.setBaggeDetail();
    this.initialization();
    this.getScreenType();
    this.getBaggageDetails();
    this.timerSubscription = interval(this.autoUpdateTimeInterval).subscribe(
      () => {
        this.getBaggageDetails();
      }
    );
    this.makeSubScription();
  }

  makeSubScription(): void {
    this.subscription?.add(
      this.sharedDataService.refreshBagsIssuedData.subscribe((loadGrid) => {
        if (loadGrid) {
          this.timerSubscription?.unsubscribe();
          this.getBaggageDetails();
          this.timerSubscription = interval(
            this.autoUpdateTimeInterval
          ).subscribe(() => {
            this.getBaggageDetails();
          });
        }
      })
    );

    this.subscription.add(
      this.sharedDataService.updateBagDetailData.subscribe(
        (bagDetailsData: any) => {
          if (bagDetailsData) {
            this.setSummarizationPageInformation(bagDetailsData);
          }
        }
      )
    );

    this.subscription.add(
      this.sharedDataService.updateBagsIssuedData.subscribe(
        (bagDetailsData: any) => {
          if (bagDetailsData) {
            this.baggageDetailsData = bagDetailsData;
            this.setBaggedDetails(true);
          }
        }
      )
    );
  }

  initialization(): void {
    const localStorageFlightsKeys = localStorage.getItem(
      LocalStorageKeys.SelectedFlights
    );
    const queryParams = this.activtedRouter.snapshot.queryParams;
    if (queryParams && queryParams['currentBadge']) {
      this.activeBag = queryParams['currentBadge'];
      this.activeBadgeName =
        this.badges?.find((badge) => badge.badgeKey === this.activeBag)
          ?.badgeName || this.activeBadgeName;
      this.activeBagCount =
        this.badges?.find((badge) => badge.badgeKey === this.activeBag)
          ?.badgeCount || this.activeBagCount;
    }
    if (localStorageFlightsKeys) {
      const details = JSON.parse(localStorageFlightsKeys);
      if (details) {
        this.flightId =
          Object.keys(details).find((key) => details[key].isSelectedFlight) ||
          '';
      }
      this.flightKeyOption = details[this.flightId]?.flightOptions;
      this.selectedFlightKey = details[this.flightId]?.selectedFlightOption;
      this.currentTab = details[this.flightId]?.currentTab;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.timerSubscription?.unsubscribe();
  }

  getScreenType() {
    this.subscription.add(
      this.sharedDataService.screenTypeChange.subscribe((data) => {
        this.isLargeScreen = data.isLargeScreen;
        this.isMediumScreen = data.isMediumScreen;
        this.isMobileScreen = data.isMobileScreen;
      })
    );
  }

  backClick() {
    this.router.navigate(['/ppbm']);
  }

  getBaggageDetails(): void {
    this.baggageDetailsService.getBaggageDetails(this.flightId).subscribe(
      (result: BaggageDetailsAPIInterface) => {
        if (result.response && Object.keys(result.response).length > 0) {
          this.setSummarizationPageInformation(result.response);
          this.setBaggedDetails();
        } else {
          this.baggageDetails = null;
          this.copyBaggageDetailsList = [];
          this.baggageDetailsList = [];
          this.setTabsCounts();
          const dialogRef = this.modalService.open(PpbmErrorDetailsComponent, {
            size: 'md',
            centered: true,
            backdrop: 'static',
            keyboard: false,
          });
          dialogRef.componentInstance.message = 'Record Not Found.';

          dialogRef.componentInstance.modalRef = dialogRef;
          this.startRoute = '';
          this.endRoute = '';
          this.setTabsCounts();
        }
      },
      (error) => {
        this.baggageDetails = null;
        this.copyBaggageDetailsList = [];
        this.baggageDetailsList = [];
        const dialogRef = this.modalService.open(PpbmErrorDetailsComponent, {
          size: 'md',
          centered: true,
          backdrop: 'static',
          keyboard: false,
        });
        // if (dialogRef.componentInstance.message == 'Record Not Found'){
        //   alert('Hi')
        //   dialogRef.componentInstance.message = error?.message;
        //   window.location.href = this.config.oamDetails.logout_url;
        //   this.router.navigate(['']);
        // }


        // this.router.navigate(['']);
        dialogRef.componentInstance.modalRef = dialogRef;
        if (dialogRef.componentInstance.message = "Record Not Found"){
          window.location.href = this.config.oamDetails.logout_url;
          // this.router.navigate(['/ppbm']);
          }
      }
    );
  }

  setSummarizationPageInformation(data: BaggageDetailsInterface): void {
    this.baggageDetails = data;
    this.baggageDetails.bagDetails.map((bag) => {
      if (
        bag?.csrAuthorization != null &&
        Object.keys(bag.csrAuthorization).length !== 0
      ) {
        const fullname = bag?.csrAuthorization?.agentName?.split(',');
        if (fullname) {
          bag.csrAuthorization.firstName = fullname[0].trim();
          bag.csrAuthorization.lastName = fullname[1].trim();
        }
      }
    });
    this.baggageDetailsData = data.bagDetails;
    sessionStorage.setItem(
      'singleBagDetailsData',
      JSON.stringify(this.baggageDetails)
    );
    this.flightViewService.appSyncSubscribeToFlightUpdatesBDT(
      this.baggageDetails.id
    );
    this.baggageDetailsService.appSyncSubscribeToFlightBagSummary(
      this.baggageDetails.id
    );
    this.displayBagContent = true;
    const route = this.baggageDetails.route;
    this.startRoute = route.split('-')[0].slice(0, 3);
    this.endRoute = route.split('-')[1].slice(0, 4);
    const flightNumber = this.flightId.split(':')[0];
    this.carrierCode = flightNumber.slice(0, 2);
    this.date = this.flightId.split(':')[1].slice(6, 8);
    this.flightNumber = flightNumber.match(/[a-z]+|[^a-z]+/gi);
    this.flightNumber = this.flightNumber[1];
    this.sharedDataService.refreshBagsIssuedFlag.next(true);
    this.sharedDataService.updateRefreshTime.next(true);
    this.baggageDetailsData?.forEach((element: any) => {
      element.pbOn = 10;
      //? logic for P/B (//Red/Green// Green/Red// Red/Red// Gray/Red// Gray/Green// Green/Green)
      //! If passenger has not barded (Red) and bag has been loaded (Green) it will display first
      //! If passenger has boarded (green) and Bag has not been loaded (Red) it will display second
      //! If passenger status is unknown (Red) and the bag has not been loaded (Red) it will display third
      //! If Passenger status is unknown (Gray) and bag has been loaded (Red) it will display fourth
      //! If passenger has not barded (Gray) and bag has not been loaded (Green) it will display fifth
      //! If passenger has boarded (Green) and bag has been loaded (Green) it will display sixth

      if (element.isPassengerBoarded && !element.isDepartureScan) {
        element.pbOn = 2; //Green/Red
      } else if (!element.isPassengerExpected && !element.isDepartureScan) {
        element.pbOn = 4; //Red/Red
      } else if (!element.isPassengerBoarded && !element.isDepartureScan) {
        element.pbOn = 3; //Gray/Red
      } else if (!element.isPassengerExpected && element.isDepartureScan) {
        element.pbOn = 5; //Gray/Green
      } else if (!element.isPassengerBoarded && element.isDepartureScan) {
        element.pbOn = 1; ///Red/Green
      } else if (element.isPassengerBoarded && element.isDepartureScan) {
        element.pbOn = 6; ///Green/Green
      }
    });
    this.baggageDetailsData.sort(
      this.sort.startSort(
        this.previousSortOrder.key,
        this.previousSortOrder.sort,
        ''
      )
    );
    sessionStorage.setItem(
      'baggageDetailsData',
      JSON.stringify(this.baggageDetailsData)
    );
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

  filterBaggadeDetailsListByBadgeName(): void {
    this.baggageDetailsList = this.copyBaggageDetailsList.filter(
      (bagDetail: any) => bagDetail[this.activeBag]
    );
  }

  setTabsCounts(): void {
    this.resetCount();
    const searchedPnr = {
      isPaxNotBoarded: [''],
    };
    this.copyBaggageDetailsList?.forEach((bagDetail) => {
      const grpValue = bagDetail?.passengerKey;
      if (bagDetail?.isBagIssued && !bagDetail?.isDeleted) this.bagIssueCount++;
      if (bagDetail?.isConnectionBag && !bagDetail?.isDeleted)
        this.connectionBagCount++;
      if (bagDetail?.isBagScanned && !bagDetail?.isDeleted)
        this.scannedBagCount++;
      if (bagDetail?.isMissingBag && !bagDetail?.isDeleted)
        this.missingBagCount++;
      if (
        this.checkGroupComdition(
          bagDetail?.isPaxNotBoarded,
          'isPaxNotBoarded',
          searchedPnr,
          grpValue
        ) &&
        !bagDetail?.isDeleted
      )
        this.paxNotBoarderdCount++;
      if (bagDetail?.isUnknowPaxStat && !bagDetail?.isDeleted)
        this.uknownPaxStatCount++;
      if (bagDetail?.isAttemptedScan && !bagDetail?.isDeleted)
        this.attemptedScanCount++;
      if (bagDetail?.needToOffload && !bagDetail?.isDeleted)
        this.needToOffroadScanCount++;
      if (bagDetail?.isAutoHeldoff && !bagDetail?.isDeleted)
        this.autoHelfoffCount++;
      if (bagDetail?.isCSRHeldoff && !bagDetail?.isDeleted)
        this.csrHeldOffCount++;
    });
    this.setBaggeDetail();
  }

  checkGroupComdition(
    value: boolean,
    key: string,
    searchGroup: any,
    compare: string
  ): boolean {
    let condition = false;
    if (value && !searchGroup[key]?.includes(compare)) {
      condition = true;
      searchGroup[key].push(compare);
    }
    return condition;
  }

  setBaggeDetail(): void {
    this.badges = [
      {
        badgeCount: this.bagIssueCount,
        badgeKey: 'isBagIssued',
        badgeName: 'Bags issued',
      },
      {
        badgeCount: this.connectionBagCount,
        badgeKey: 'isConnectionBag',
        badgeName: 'Connection bags',
      },
      {
        badgeCount: this.scannedBagCount,
        badgeKey: 'isBagScanned',
        badgeName: 'Bags scanned',
      },
      {
        badgeCount: this.missingBagCount,
        badgeKey: 'isMissingBag',
        badgeName: 'Bags not scanned',
      },
      {
        badgeCount: this.paxNotBoarderdCount,
        badgeKey: 'isPaxNotBoarded',
        badgeName: 'Pax not boarded',
      },
      {
        badgeCount: this.uknownPaxStatCount,
        badgeKey: 'isUnknowPaxStat',
        badgeName: 'Unknown pax stat',
      },
      {
        badgeCount: this.attemptedScanCount,
        badgeKey: 'isAttemptedScan',
        badgeName: 'Attempted scan',
      },
      {
        badgeCount: this.needToOffroadScanCount,
        badgeKey: 'needToOffload',
        badgeName: 'Need to offload',
      },
      {
        badgeCount: this.autoHelfoffCount,
        badgeKey: 'isAutoHeldoff',
        badgeName: 'Auto heldoff',
      },
      {
        badgeCount: this.csrHeldOffCount,
        badgeKey: 'isCSRHeldoff',
        badgeName: 'CSR heldoff',
      },
    ];
    this.activeBagCount =
      this.badges?.find((badge) => badge.badgeKey === this.activeBag)
        ?.badgeCount || this.activeBagCount;
  }

  onBadgeChange(
    selectedbag: string,
    selectedBadgeName: string,
    bagCount: number
  ): void {
    this.activeBag = selectedbag;
    this.activeBadgeName = selectedBadgeName;
    this.activeBagCount = bagCount;
    this.router.navigate([], {
      queryParams: {
        currentBadge: this.activeBag,
      },
    });
    this.count = 0;
    this.btnAddNote = false;
    this.btnHold = false;
    this.btnLoad = false;
    this.baggageDetailsList?.forEach((detail) => (detail.isChecked = false));
    this.filterBaggadeDetailsListByBadgeName();
  }

  onFlightSelected(value: Object) {
    this.activeBag = 'isBagIssued';
    this.flightId = value.toString();
    this.baggageDetailsService.appSyncSubscribeToFlightBagSummary(
      this.flightId
    );
    this.router.navigate([], {
      queryParams: {
        currentBadge: this.activeBag,
      },
    });
    this.getBaggageDetails();
  }

  setBaggedDetails(fromAppSync?: boolean): void {
    this.baggageDetailsList = [];
    this.copyBaggageDetailsList = [];
    const bagDetailList: SummrizedBaggedDetailInterface[] = fromAppSync
      ? this.baggageDetailsData
      : this.baggageDetails?.bagDetails || [];
    bagDetailList.forEach((bags: SummrizedBaggedDetailInterface) => {
      bags.fullName = `${bags.passengerLastName}, ${bags.passengerFirstName}`;
      bags.statusTime = bags.lastLocalScanTime.slice(11, 16);
      bags.isChecked = this.isChecked;
    });
    this.baggageDetailsList = bagDetailList;
    this.copyBaggageDetailsList = bagDetailList;
    if (sessionStorage.getItem('singleBagDetailsData')) {
      const singleBagDetailsData = JSON.parse(
        sessionStorage['singleBagDetailsData']
      );
      this.flightViewService.appSyncSubscribeToFlightUpdatesBDT(
        singleBagDetailsData.id
      );
      this.baggageDetailsService.appSyncSubscribeToFlightBagSummary(
        singleBagDetailsData.id
      );
    }
    this.confirmationCheck(false);
    this.setTabsCounts();
    this.filterBaggadeDetailsListByBadgeName();
  }

  // Bag details popup MFE
  openBagdetail(bag: SummrizedBaggedDetailInterface) {
    if (bag?.bagTagNumber && bag?.bagKey) {
      localStorage.setItem('isFromPNRView', 'false');
      bag.isChecked = true;
      if (!this.isBaggedDetailDialogOpened) {
        this.currentBagDetail = bag;
        const modalRef = this.modalService.open(BaggageDetailsDialogComponent, {
          scrollable: true,
          size: 'lg',
          backdrop: 'static',
          windowClass: 'slider',
          backdropClass: 'slider-no-backdrop',
          keyboard: false,
        });
        this.isBaggedDetailDialogOpened = true;
        modalRef.componentInstance.holdOffBags =
          this.baggageDetailsList?.filter(
            (baggage) => baggage.bagTagNumber === bag?.bagTagNumber
          );
        modalRef.componentInstance.bag = bag;
        modalRef.componentInstance.baggedId = bag?.bagTagNumber;
        modalRef.componentInstance.baggedKey = bag?.bagKey;
        modalRef.componentInstance.currentPageUrl = this.router.url;
        modalRef.componentInstance.baggageDetailsList = this.baggageDetailsList;
        modalRef.componentInstance.bagChecked = bag?.isChecked;
        modalRef.componentInstance.flightKey = this.baggageDetails?.id;
        modalRef.componentInstance.flightNumber =
          this.baggageDetails?.flightNumber;
        modalRef.result.then((data) => {
          bag.isChecked = false;
          this.isBaggedDetailDialogOpened = false;
          this.currentBagDetail = null;
          localStorage.removeItem('baggedId');
          localStorage.removeItem('baggedKey');
          this.getBaggageDetails();
        });
        window.history.replaceState({}, 'Page', 'baggage');
      } else {
        const currentBagDetail = this.baggageDetailsList?.find(
          (bag) => bag?.bagKey === this.currentBagDetail?.bagKey
        );
        if (currentBagDetail) {
          currentBagDetail.isChecked = false;
          this.currentBagDetail = bag;
          const data: any = {};
          data.holdOffBags = this.baggageDetailsList?.filter(
            (baggage) => baggage.bagTagNumber === bag?.bagTagNumber
          );
          data.bag = bag;
          data.baggedId = bag?.bagTagNumber;
          data.baggedKey = bag?.bagKey;
          data.currentPageUrl = this.router.url;
          data.baggageDetailsList = this.baggageDetailsList;
          data.bagChecked = bag?.isChecked;
          data.flightKey = this.baggageDetails?.id;
          this.loadHoldService.onFlightKeyChangeSubject?.next(data);
        }
      }
    }
  }
  // Bag details popup MFE end

  resetCount(): void {
    this.bagIssueCount = 0;
    this.connectionBagCount = 0;
    this.scannedBagCount = 0;
    this.missingBagCount = 0;
    this.paxNotBoarderdCount = 0;
    this.uknownPaxStatCount = 0;
    this.attemptedScanCount = 0;
    this.needToOffroadScanCount = 0;
    this.autoHelfoffCount = 0;
    this.csrHeldOffCount = 0;
  }
  confirmationCheck(event: any) {
    this.count = 0;
    this.baggageDetailsList?.forEach((item: SummrizedBaggedDetailInterface) => {
      if (item.isChecked) {
        this.count++;
        this.btnLoad = true;
        this.btnHold = true;
        this.btnAddNote = true;
      }
      if (!event) {
        this.btnLoad = false;
        this.btnHold = false;
        this.btnAddNote = false;
      }
      if (!event && this.count >= 1) {
        this.btnLoad = true;
        this.btnHold = true;
        this.btnAddNote = true;
      }
    });
    this.btnAddNote = this.count > 0;
  }

  openAddNoteHoldLoadModal(buttonSelected: string, bag: any) {
    this.sharedDataService.showAddNotesHoldLoadModal.next(true);
    const modalInstance = this.modalService.open(
      PpbmAddNoteHoldLoadModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static',
        keyboard: false,
      }
    );
    if (modalInstance) {
      if (buttonSelected != 'View Note') {
        modalInstance.componentInstance.holdOffBags =
          this.baggageDetailsList?.filter((baggage) => baggage.isChecked);
        modalInstance.componentInstance.baggageDetails = this.baggageDetails;
        modalInstance.componentInstance.buttonSelected = buttonSelected;
      } else {
        modalInstance.componentInstance.bagView = bag;
        modalInstance.componentInstance.baggageDetails = this.baggageDetails;
        modalInstance.componentInstance.buttonSelected = buttonSelected;
      }
    }

    modalInstance?.result?.then(() => {
      setTimeout(() => {
        this.getBaggageDetails();
      }, 2000);
    });
  }
}