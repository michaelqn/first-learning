if (A) {
  if (B) {}
}
is equivalent to combining the two conditions via AND

if (A && B) ()
+++++++++++++++++++++++++++++++++++++++++++++++++++
[ngClass]="{
  'btn-classs': flight.delay=='true',
  'btn-basic': flight.ontime == 'true'
}"

////////////////////////////////////////////////////////
addIngredients(ingredients: Ingredient[]) {
  // for (let ingredient of ingredients) {
  //   this.addIngredient(ingredient);
  // }
  this.ingredients.push(...ingredients);//push ARRAY into another array
  this.ingredientsChanged.next(this.ingredients.slice());
}

++++++++++++++++++++++++++++++++++++++++++++++++++++++
WHEN USE multiple (-=)
/ if ((buttonSelected !== 'Add Note' && buttonSelected !== 'View Note')) {

if(!(this.buttonSelected == 'Add Note' || this.buttonSelected == 'Load')){
        this.loadHoldService
        .getBaggeDetailByBagKey(this.bagView.bagTagNumber)
        .subscribe((response) => {
          this.journeyBagDetail = response?.response;
        });
      }
+++++++++++++++++++++++++++++++++++++++++
[ngStyle]="{ 'background-color': selectedFlights && selectedFlights.length === 0 ? '#E6E6E6' : '#6244bb' }"
+++++++++++++++++++++++++++++++
<ng-container *ngFor="let item of bagHistoryDetails;let i= index">
  <li *ngIf="item.layoverDetail && !(item.layoverDetail.length==0 &&  item.routeType=='onlyFinalLeg')"
      [ngStyle]="{'min-height':showHistory === false ? '100px' : '100px'}"
      [ngClass]="{'stArw': (bagHistoryDetails[i+1] && !checkDotLines(bagHistoryDetails[i+1])) && (!(bagHistoryDetails.length >i+1 && (bagHistoryDetails[i]?.routeOrg == bagHistoryDetails[i+1]?.routeDest))||(bagHistoryDetails[i+1].flightStatus=='cancelled')),
      'dashed-line': bagHistoryDetails[i+1] && checkDotLines(bagHistoryDetails[i+1]),
     'bag_arrow_details':((bagHistoryDetails.length >i+1) && (bagHistoryDetails[i]?.routeOrg == bagHistoryDetails[i+1]?.routeDest) && (bagHistoryDetails[i+1].flightStatus=='upcoming'||bagHistoryDetails[i+1].flightStatus=='current'||bagHistoryDetails[i+1].flightStatus=='not departed'||bagHistoryDetails[i+1].flightStatus== 'departed'||bagHistoryDetails[i+1].flightStatus== 'RTBL'||bagHistoryDetails[i+1].flightStatus== 'RTFL'))}">

//+++++++++++++++++++++++++++++++++++++++++++++++
<i class="reroute_only text-white mr-2"
[ngClass]="
      bagsPopupDetail.baggageType=='rush' ? 'icons-rush'
    : bagsPopupDetail.baggageType=='reclaim' ? 'icons-reclaim'
    : bagsPopupDetail.baggageType == 'reroute' ? 'icons-reroute'
    : 'icons-none'"></i>

    <i *ngIf="mileageStatus != null && mileageStatus !== ''"
    [ngClass]="{
        'icons-global-services': mileageStatus == 'GLOBAL_SERVICES',
        'plus_1K': mileageStatus == 'PREMIER_1K'  ,
        'platinum': mileageStatus == 'PREMIER_PLATINUM',
        'premier-gold': mileageStatus == 'PREMIER_GOLD',3
        'premier-silver': mileageStatus == 'PREMIER_SILVER'
    }"></i>

    <strong class="only-ie-strong ie-passenger " [ngClass]="{'passenger-pnr-pos' : !mileageStatus || mileageStatus=='MEMBER', 'bagPopup-passenger-padding' : mileageStatus && mileageStatus !=='MEMBER'}">{{bagsPopupDetail.surname?bagsPopupDetail.surname:""}},
        {{bagsPopupDetail.firstname?bagsPopupDetail.firstname:""}}</strong>

        <span class="rounded-pill px-1 py-0 d-inline-block" [ngStyle]="{'background':fromRouter=='search' ? '#E5EAF5' : '' }" >{{bagsPopupDetail.bagTagNum?bagsPopupDetail.bagTagNum:""}}</span></strong>

        <div class="w-70 align-self-center" data="ddfdf"><strong class="pl-3 ml-1 pl-lg-0 ml-lg-0">
            {{ bagsPopupDetail.bagDescr? (bagsPopupDetail.bagDescr.length>15)? (bagsPopupDetail.bagDescr
            | slice:0:15)+'..':(bagsPopupDetail.bagDescr):"" }}
        </strong></div>

        <div *ngIf="NRSAStatus=='true' && ( (item.flightStatus=='upcoming' && paxFutStnPos==i))"
        class="tag position-absolute rounded-pill bg-white nsra">NRSA</div>

        [ngClass]="[bagsPopupDetail.baggageType =='rush' ? 'reroute_bag_rush' : bagsPopupDetail.baggageType=='reclaim' ? 'reroute_bag_reclaim' : bagsPopupDetail.baggageType == 'reroute' ? 'reroute_bag' : 'reroute_bag_none']">

 <span class="icons-traveler align-self-top mt-1"
       [ngClass]="layoverItem.passengerStatus=='boarded' ? 'green' : 'torsoIcon'"></span>
[ngClass]="mobileScreen ? 'passangerDiv': 'baggageDiv’">

[ngStyle]="{'min-height':showHistory === false ? '100px' : '100px' }”

bag-tag-open

        <span class=" mr-lg-3 mr-1 iconSet”
                        [ngClass]="{
                                'icons-inactive': item.flightStatus=='upcoming' &&  paxFutStnPos > i,
                                'icons-active': ((item.flightStatus=='completed' || item.flightStatus=='departed') || (i>0 && paxFutStnPos==i)) || (item.flightStatus=='upcoming' && i== 0)  ,
                                'iconRhapsody': item.flightStatus=='upcoming' ,
                                'text-success':( paxAllCompleteFLag==true  && i==0 && routeTypeFlag===false) || ( paxAllCompleteFLag==true  && i==1 && routeTypeFlag===true)
                            }"></span>

        <script>
            if (this.bagsPopupDetail.bagHistory && this.bagsPopupDetail.bagHistory.length)

            if (firstBagLeg.routeType == "onlyFinalLeg" && this.bagsPopupDetail.bagHistory[0].layoverDetail.length > 0)
                    if (dataTimesync != null)


if (typeof this.completedBagsArray != undefined && this.completedBagsArray != null && this.completedBagsArray.length > 0 && this.stationLocalTime != null)
 this.showLoader = (this.flightKeyList.length > 0) ? true : false;

if (responseList != null && responseList.length > 0){}


        </script>


////sorting+++++
.sort((a, b) => {
    const a2 = a as unknown as Type;
    const b2 = b as unknown as Type;
    if (a2.something > b2.something) {
      return 1;//asc
    }

    if (a2.something < b2.something) {
      return -1;//desc
    }

    return 0;
  })
  //////////////////
  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
  ///////
  <div class="align-self-center w-60">
    <ng-container *ngIf="unkFlightNumberFlag;  then iAmDone; else iAmNotDone">
        {{ bag.flightNumberWithCode }}
    </ng-container>

    <ng-template #iAmDone>
        <span [innerHTML]="bag.flightNumberWithCode"></span>&#8211;
        <span [innerHTML]="bag.flightScheduledDepartureDate"></span>
        <!-- {{ bag.flightNumberWithCode }}-{{bag.flightScheduledDepartureDate}} -->
    </ng-template>

    <ng-template #iAmNotDone>
      It's Not Done!
    </ng-template>
      <!-- <ng-container >
    <div *ngIf="unkFlightNumberFlag; then second else templateName">
        {{ bag.flightNumberWithCode }}
      </div>
      <ng-template templateName>
        {{ bag.flightNumberWithCode }}&#8211;{{bag.flightScheduledDepartureDate}}
    </ng-template>
</ng-container> -->
<!-- {{ bag.flightNumberWithCode }}&#8211;{{bag.flightScheduledDepartureDate}} -->
  </div>
  payload.map((obj) => {
    obj.fullName = obj.firstName && obj.lastName ? obj.firstName +", "+obj.lastName: "";
    return obj;
  })
  +++++++++++++++++++++
  this.isNotCompleted = (assignmemntDetails.status != 'Completed');
  ++++++++++++++++++++++++
  if (key && key.flightStatus != 'completed') {
    this.paxAllCompleteFLag = false
  }

  ++++++++++++++++++++++++++++++++++++++++
  <h2 class="align-self-center" *ngIf="router.url === '/assignment-details'" style="text-align: center;width: auto;margin: 0 auto;">
    {{ getBagTagType() }} ({{ (flightDetail.totalBags != null) ? flightDetail.totalBags : 0 }}) 
    | {{ flightDetail.flightNumberWithCode === "UA 9999" ?"UNK": flightDetail.flightNumberWithCode + (flightDetail.departureDate == null ? "" : " &#8211; " + flightDetail.departureDate )}}
</h2>
+++++++++++++++++++++++++++++++

[ngStyle]="{'min-height':showHistory === false ? '100px' : '100px' }"
[ngClass]="layoverItem.baggageDepart ? 'text-success' : ''"></span>
+++++++++++++++++++++++++++++++++++
<span class=" mr-lg-3 mr-1 iconSet" [ngClass]="{
  'icons-inactive': ((item.routeOrg != baseStation || item.routeDest != newStation)  && (item.flightStatus=='upcoming' ))||(item.flightStatus=='cancelled'||item.flightStatus=='RTBL'||item.flightStatus=='RTFL'||item.flightStatus=='not departed'),
  'icons-active': (item.flightStatus=='completed' || item.flightStatus=='departed'||item.flightStatus=='not departed' || (item.routeOrg== baseStation && item.routeDest== newStation  && (item.flightStatus=='upcoming')) || (bagAllCompleteFLag==true && i==0)),
  'iconNavy': item.flightStatus=='departed',
  'iconRhapsody':!item.baggageType&& item.flightStatus!='completed' && item.flightStatus!='departed',
  'reroute_alert_icon': (item.flightStatus=='upcoming'||item.flightStatus=='not departed'||item.flightStatus=='cancelled'||item.flightStatus=='RTBL'||item.flightStatus=='RTFL') && (item.baggageType=='reroute'),
  'rush_alert_icon':  (item.flightStatus=='upcoming'||item.flightStatus=='not departed'||item.flightStatus=='cancelled'||item.flightStatus=='RTBL'||item.flightStatus=='RTFL') && (item.baggageType=='rush'),
  'text-success': item.flightStatus=='completed' && i==1}">

</span>
<script>
   //this enables to press back and have the page reload to load the correct acc typy on the dropdown.
   @HostListener('window:popstate', ['event']) onpopstate(event){
    window.location.reload();
  }
  //+++++++++++++
  <ng-template #dataTableCell let-item="item">
      {{ item.price | currency:'USD':true }}
    </ng-template>
+++++++++++++++++++++++++++++++++++
let greeting = person => {
  let name = person ? person.name : `stranger`
  return `Howdy, ${name}`
}

console.log(greeting({name: `Alice`}));  // "Howdy, Alice"
console.log(greeting(null));             // "Howdy, stranger"
+++++++++++++++++++++++++++++
function example(…) {
  return condition1 ? value1
       : condition2 ? value2
       : condition3 ? value3
       : value4;
}

let res = condition1A ? (condition1B ? "Hi" : "not hi") : condition1C

// Equivalent to:

function example(…) {
  if (condition1) { return value1; }
  else if (condition2) { return value2; }
  else if (condition3) { return value3; }
  else { return value4; }
}
+++++++++++++++++++++++++++++++++++++++++++++
For clarity, that expression resolves like this:

const myThing = conditionA ? (conditionB ? thingA : thingB) : thingC;
if conditionA is true - evaluate the second conditional operator
if conditionB is true - return thingA
if conditionB is false - return thingB
if conditionA is false - return thingC
This plays on boolean logic combination where

if (A) {
  if (B) {}
}
is equivalent to combining the two conditions via AND

if (A && B) ()

However, nesting the expressions makes it a lot harder to understand what is happening because you need to mentally map the entire expression in order to understand it. Compare these two

const x = A ? B ? C ? "one" : "two" : "three" : "four";
and

if (A && B && C) return "one";
if (A && B) return "two";
if (A) return "three";

return "four"

+++++++++++++++++++++++++++++
const greeting = '   Hello world!   ';

console.log(greeting.slice(0, 20).trimEnd());
// expected output: "   Hello world!   ";

console.log(greeting.trimEnd());
// expected output: "   Hello world!";
++++++++++++++++++++++++++++++++++++++++

(credits < 30) ? "freshman" : (credits >= 30 && credits < 60) ?"sophomore" : (credits >= 60 && credits < 90) ? "junior" : "senior"
String year = credits < 30 ? "freshman": credits <= 59 ? "sophomore": credits <= 89 ? "junior" : "senior";

// +++++++++++++++++++++++++++++++++++++

var engagement = "social";
var audience = [{ 'verified': true, 'name': 'Steve'},
                { 'verified': false, 'name': 'Phil'},
                { 'verified': true, 'name': 'Jason'}];
data = audience.filter((item) => {
  (engagement === "social") ? item.verified === true
  : (engagement === 'social-crm') ? item.verified === false
  : (engagement === 'all')?
item : null})
// if(this.engagement === 'social-crm') { return item.verified === true; }
// else {
//    if(this.engagement === 'social') {item.verified === false; }
//    else {
//        if(this.engagement === 'all') {return item;}
//    }
// }
</script>
<script>// Push id:All on the the top
    if (this.flightsArrayCopy != null && this.flightsArrayCopy.length > 0) {
      this.flightsArray.push({ id: "All", value: `All flights with ${params.status.toLowerCase()} bags` });

      this.flightsArrayCopy.forEach((e) => {
        this.flightsArray.push({ id: e.flightKey, value: `${e.flightNumberWithCode}, ${e.flightRoute}` });
        console.log("flightsArray >>> ", this.flightsArray)
      });
    }
    else {
      this.flightsArray.push({ id: "NA", value: 'No flights found' });
    }
</script>

<!DOCTYPE html>
<html>
<>

  <script type="text/javascript">
   let n = 100;

   let result = (n >= 0) ? (n == 0 ? "zero" : "positive") : "negative";

   console.log(`The number is ${result}.`);//RES: The number is positive.
   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   let num = 1;
let word;
if (num === 1) word = 'one';
else if (num === 2) word = 'two';
else if (num === 3) word = 'three';
else num = 'unknown';
//++++++++++++++++++++++++++++++++++++++++++++++++
handleFootnote():void{
    this.promoTnc=[];
    //footnotes without Promo  - TZ72178
    let json = JSON.parse(this.promoTncData.tncList.tnc);
    for (const i in json) {
        this.promoTnc.push(json[i].text);
    }
    //added footnote terms and conditions with Savings Promo
    if(this.hasPromo && !this.showAccelerateFirst){
      let json = JSON.parse(this.promoTncData.tncList.tncSavingsPromo);
      for (const i in json) {
        var temp=json[i].text;
        if(!this.pb.isMember){
          var tncIndex = temp.indexOf("and-conditions");
          if(tncIndex>0){
            temp= temp.slice(0, tncIndex+14) + "?waveId=" //14 is the length of and-conditions
            + this.bankingData['Package_GoldRegular'].products['Citi Savings Account'].regionalRatesListMap.regular.waveId
            //Gold Regular Rate for prelogin
            + temp.slice(tncIndex+14);
          }
        }else{
          var tncIndex = temp.indexOf("and-conditions");
          if(tncIndex>0){
            temp= temp.slice(0, tncIndex+14) + "?waveId="
            + this.savingsPostLoginwaveId
            //highest rates package for postlogin
            + temp.slice(tncIndex+14);
        }
      }
        this.promoTnc.push(temp);
    }
  }
    //added footnote terms and conditions with Accelerate Savings Promo for non CPB, non IPB and non GEB customers
    if(this.hasCitiAccPromo && !(this.pb.isIPB || this.pb.isGEB || this.pb.isCitiPrivateBanking) && this.showAccelerateFirst){
      let json = JSON.parse(this.promoTncData.tncList.tncAccelerateSavingsPromo);
      for (const i in json) {
        var temp=json[i].text;
        if(!this.pb.isMember){
          var tncIndex = temp.indexOf("and-conditions");
          if(tncIndex>0){
            temp= temp.slice(0, tncIndex+14) + "?waveId=" //14 is the length of and-conditions
            + this.bankingData['Package_GoldRegular'].products['Money Market Account2'].regionalRatesListMap.regular.waveId
            //Gold Regular Rate for prelogin
            + temp.slice(tncIndex+14);
          }
        }else{
          var tncIndex = temp.indexOf("and-conditions");
          if(tncIndex>0){
            temp= temp.slice(0, tncIndex+14) + "?waveId=" //14 is the length of and-conditions
            + this.accSavingsPostLoginwaveId
            //highest rates package for postlogin
            + temp.slice(tncIndex+14);
        }
      }
        this.promoTnc.push(temp);
    }
  }
    this._fetchRatesService.dispatchTNC.emit(this.promoTnc);
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  bagTypeDesc: string;

  if (this.bagsPopupDetail.baggageType == "rush") {
                this.bagTypeDesc = "Rush bag / original itinerary";
                this.mobileBagTypeDesc = "Rush bag / orig itin";
              } else if (this.bagsPopupDetail.baggageType == "reclaim") {
                this.bagTypeDesc = "Reclaim bag / original itinerary";
                this.mobileBagTypeDesc = "Reclaim bag / orig itin";
              } else if (this.bagsPopupDetail.baggageType == "reroute") {
                this.bagTypeDesc = "Reroute / original itinerary";
                this.mobileBagTypeDesc = "Reroute / orig itin";
              }
  // +++++++++++++++++++++++++++++++++++
  this.flightKeyList = (this.bagViewParams["data"].hasOwnProperty("flightKey")) ? [this.bagViewParams["data"]["flightKey"]] : Array.from(UtilityService.getAllFlightKeys());
//this.showLoader = (this.flightKeyList.length > 0) ? true : false;

payload.map((obj) => {
            let string = ", ";
            obj.fullName = obj.lastName && obj.firstName ? obj.lastName + string + obj.firstName : "";
            return obj;
          })
//+++++++++++++++++++++++++++++++++++++
getBagTagType(): string {
    return UtilityService.getBagViewParams()["status"];//["status"] mean "Miss" or "Open"
  }
  public static getBagViewParams(): any {
    return (localStorage.getItem('assignment_details_params') != null) ? JSON.parse(localStorage.getItem('assignment_details_params')) : null;
  }
//+++++++++++++++++++++++++++++++++++++
let type = this.bagsPopupDetail.bagHistory.find((data) => {
                return data.baggageType !== null || data.baggageType !== ""
                  ? data.baggageType
                  : "";
              });
              if (openBagDetails.bagTagStatus) {
                this.bagsPopupDetail.baggageType = openBagDetails.bagTagStatus;
              } else if (type.baggageType) {
                this.bagsPopupDetail.baggageType = type.baggageType;
              }
//++++++++++++++++++++++++
  public formvalidate(selectedValue) {
		console.log(selectedValue);
		const gs = this._storageService.get('GoverningState', StorageService.COOKIE);
		this.myapplynowfrm.validate().then(formIsValid => {
			if (formIsValid && selectedValue) {
				let appName = '';
				const appNameEnd = selectedValue;
				console.log(appNameEnd);
				if (this.pb.isMember) {
					if (this.pb.customerType === 'SPF') {
						appName = `${this.cdDetailsHeroObj.cdApplyNowUrlUnAuthenticated}${appNameEnd}`;
					} else {
						appName = `${this.cdDetailsHeroObj.cdApplyNowUrlAuthenticated}${appNameEnd}`;
					}
				} else {
					if (gs === undefined || gs === null) {
						appName = `${this.cdDetailsHeroObj.cdApplyNowUrlUnAuthenticated}${appNameEnd}`;
					} else {
						appName = `${this.cdDetailsHeroObj.cdApplyNowUrlUnAuthenticated}${appNameEnd}&GS=${gs}`;
					}
				}
				console.log(appName);
				window.open(appName, '_self');
			}
		});
	}
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  setWaveIdToURLs(urlText, waveId) {
		const firstIndex = urlText.substring(urlText.indexOf('href='));
		const hrefVal = firstIndex.substring(0, firstIndex.indexOf(' ') - 1).concat('?waveId=' + waveId);
		if (urlText.indexOf('?waveId') === -1) {
			urlText = urlText.replace(firstIndex.substring(0, firstIndex.indexOf(' ') - 1), hrefVal);
		}
		console.log('urlText>', urlText);
		return urlText;
	}
	/**
	 *  This function takes footnotesContent(data), waveId and productname as parameters
	 *  then add waveId to the href and return the footnotecontent
	 */
	checkPromoLinkInFootnoteContent(data,waveId,productName){
		let temp;
		const footnotesJson = data;
		for (const i in footnotesJson) {
			if (true) { // TSLint fixed
				temp = footnotesJson[i].text;
				let tncIndex = temp.indexOf(productName);
				if (tncIndex > 0) {
					if(productName === 'step-up'){
						this.stepUpCdFootnotes[i].text = this.setWaveIdToURLs(temp, waveId);
					}else if(productName === 'fixed'){
						this.fixedRateCdFootnotes[i].text = this.setWaveIdToURLs(temp, waveId);
					}else{
						this.noPenaltyCdFootnotes[i].text = this.setWaveIdToURLs(temp, waveId);
					}
				}
			}
		}
	}
  //++++++++++++++++++++++
  let result: any = {
                                completedTime: completedTime,
                                success: true,
                                remarks: this.selectedmark != 'Other reason' ? this.selectedmark : `${this.selectedmark} - ${this.otherReason}`,
                                agentId: this.cookieService.get("x-uid"),
                                //fullName: `${this.cookieService.get("x-surname").charAt(0)}.${this.cookieService.get("x-name")}`,
                                fullName: this.cookieService.get("x-fullname"),
                                stationValue: localStorage.getItem("stationValue"),
                            };
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  nagivateToPaxView(bagsPopupDetail: any) {
    this.dataService.setJourneyBags(bagsPopupDetail.journeyBags)
    this.route.navigate(["/pax-view"]);
  }
  //==========
dataService File

journeyBags: Array<any> = [];
  setJourneyBags(journeyBags) {
    this.journeyBags = journeyBags;
  }

  getJourneyBags() {
    return this.journeyBags;
  }
  //++++++++++++++++++++++++++++
  let iconsList: Array<any> = this.JourneyBagsList.filter(item => item.bagTagStatus && (item.bagTagStatus.toUpperCase() === 'RUSH' ||
          item.bagTagStatus.toUpperCase() === 'RECLAIM' ||
          item.bagTagStatus.toUpperCase() === 'REROUTE'));
          console.log("iconsList>> ", iconsList)

        let nonIconList: Array<any> = this.JourneyBagsList.filter(item => !item.bagTagStatus || (item.bagTagStatus.toUpperCase() != 'RUSH' &&
          item.bagTagStatus.toUpperCase() != 'RECLAIM' &&
          item.bagTagStatus.toUpperCase() != 'REROUTE'));
          console.log("nonIconList>> ", nonIconList)
        if (nonIconList.length > 0 && iconsList.length > 0) {
          this.JourneyBagsList = iconsList.concat(nonIconList);//nonIconList is last index (4)
          console.log("JourneyBagsListICON>> ", this.JourneyBagsList)
        }
        //+++++++++++++++++++++++++++++++++++++++++++++++
        let payload: any = {
      bags: [],
      station: UtilityService.getBaseStation(),
      date: UtilityService.getDate()
    }
    journeyBags.forEach((bag: any) => {
      payload.bags.push(
        {
          bagKey: bag.bagKey,
          bagTagNumber: bag.bagTagNumber });
          console.log("payload >>>", payload)
    });
 </script>
<h2 class="align-self-center" *ngIf="router.url === '/assignment-details'" style="text-align: center;width: auto;margin: 0 auto;">
  {{ getBagTagType() }} ({{ (flightDetail.totalBags != null) ? flightDetail.totalBags : 0 }}) | {{ flightDetail.flightNumberWithCode === "UA 9999" ?"UNK": flightDetail.flightNumberWithCode + (flightDetail.departureDate == null ? "" : " &#8211; " + flightDetail.departureDate )}}
  +++++++++++++++++++++++++++++++++++++++++

  <h2 *ngIf="totalBags > 0" class="m-0">
    {{ getBagTagType() }} bags ({{ totalBags }}) | {{ flightDetail.flightNumberWithCode === "UA 9999" ?
      "UNK": flightDetail.flightNumberWithCode + (flightDetail.scheduledDepartureDate == null ? "" : "-" + flightDetail.scheduledDepartureDate ) + ", " + flightDetail.flightRoute}}
    <span *ngIf="flightDetail?.flightNumberWithCode === 'UA 9999'">, {{ flightDetail.flightRoute }}</span>
  </h2>
</h2>
//+++++++++++++++++++++++++++++++++++++++++

<h2>The fromEntries() Method</h2>

<p>The number of pears are:</p>
<p id="demo"></p>

<script>
const fruits = [
["apples", 300],
["pears", 900],
["bananas", 500]
];

const myObj = Object.fromEntries(fruits);
document.getElementById("demo").innerHTML = myObj.pears;//result: 900
</script>
//+++++++++++++++++++++++++++++++++++++++++
<h2>The flat() Method</h2>

<p id="demo"></p>

<script>
const myArr = [[1,2],[3,4],[5,6]];

const newArr = myArr.flat();
document.getElementById("demo").innerHTML = newArr;//result: 1,2,3,4,5,6
</script>
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<p>The Object.entries() method returns an array of the key/value pairs in an object:</p>

<p id="demo"></p>

<script>
const person = {
  firstName : "John",
  lastName  : "Doe",
  age     : 50,
  eyeColor  : "blue"
};
document.getElementById("demo").innerHTML = Object.entries(person);//result:firstName,John,lastName,Doe,age,50,eyeColor,blue
</script>
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<p>The Object.values() method returns an array of values from an object:</p>

<p id="demo"></p>

<script>
const person = {
  firstName : "John",
  lastName  : "Doe",
  age     : 50,
  eyeColor  : "blue"
};
document.getElementById("demo").innerHTML = Object.values(person);//result:John,Doe,50,blue
</script>
//+++++++++++++++++++++++++++++++++++
<p>Add values to a Set:</p>

<p id="demo"></p>

<script>
// Create a Set
const letters = new Set();

// Add Values to the Set
letters.add("a");
letters.add("b");
letters.add("c");

// Display set.size
document.getElementById("demo").innerHTML = letters.size;//result: 3
</script>
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<script>
file.html
[ngStyle]="{'height': this.innerWidth >640 ? this.bagPopupHeight+'px' :'100%' }"

file.ts
ngOnInit() {
  this.travelMonthAndYear = new Date();
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
  this.bagPopupHeight = window.innerHeight - 60;
}
</script>
//++++++++++++++++++++++++++++++++++++++++++++++++++++
<h2>JavaScript Arrays</h2>

<p>The Array.from() method returns an Array object from any object with a length property or any iterable object.</p>

<p id="demo"></p>

<script>
const myArr = Array.from("ABCDEFG");
document.getElementById("demo").innerHTML = myArr;//result: [A,B,C,D,E,F,G]
</script>
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<script>
  Example for Sibling Component Communication,
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ListComponent } from './list.component';
import { DetailComponent } from './detail.component';

@Component({
  selector: 'app-component',
  template: '< list-component >< / list-component >< detail-component >< / detail-component >',
  directives: [ListComponent, DetailComponent]
})
class AppComponent implements AfterViewInit {
  @ViewChild(ListComponent) listComponent:ListComponent;
  @ViewChild(DetailComponent) detailComponent: DetailComponent;

  ngAfterViewInit() {
    //Afther this point the children are set, so you can use them
    this.detailComponent.doSomething();
  }
}
//++++++++++++++++++++++
onFlightDropDownChange(event: any, flight: any): void {
    event.stopPropagation();
    const status = UtilityService.getBagViewParams()["status"];
    let paramsNew;

    if (flight.id === "All" || flight.id === "NA") {
      paramsNew = {
        data: {
          carrierCode: flight.id,
          flightNumber: flight.id
        },
        status: status
      };
      console.log("paramsNewAllFlight>>> ", paramsNew)
    }
    else {
      paramsNew = {
        data: this.flightsArrayCopy.filter(f => f.flightKey === flight.id)[0],
        status: status
      };
      console.log("paramsNew>>> ", paramsNew)
    }

    UtilityService.setBagViewParams(paramsNew);
</script>
//++++++++++++++++++
const params = Object.assign({}, UtilityService.getBagViewParams());
    this.flightDetail = Object.assign({}, params.data);
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    addPopupsNotifications(dataObj: any, flightDetailsData: any, type: string): void {
    if (dataObj.AlertType.includes('GateChange')) {
      dataObj.AlertType = 'GateChange';
    }
    if (dataObj.AlertType.includes('EquipmentChange')) {
      dataObj.AlertType = 'EquipmentChange';
    }
    if (!['GateChange', 'EquipmentChange', 'MissingBag', 'NoNameBag', 'Delayed', 'FlightCancelled'].includes(dataObj.AlertType)) {
      return;
    }
    let data: any = [];
    data.push(dataObj);
    const mappingData: any = {
      'EquipmentChange': { bgClass: 'bg-yellow', iconClass: 'equipment-change-black', dataLine1: 'Equipment Change' },
      'GateChange': { bgClass: 'bg-yellow', iconClass: 'gate-change-black', dataLine1: 'Gate Change' },
      'MissingBag': { bgClass: 'bg-orange', iconClass: 'missing-bag-black' },
      'NoNameBag': { bgClass: 'bg-yellow', iconClass: 'noname-bag-black' },
      'Delayed': { bgClass: 'bg-yellow', iconClass: 'delayed-black' },
      'FlightCancelled': { bgClass: 'bg-yellow', iconClass: 'flight-cancelled-black', dataLine1: 'Flight cancelled' },
    }
    data.forEach((item: any) => {
      const selectedFlight = flightDetailsData.find((flight: any) => {
        return flight.flightKey === item.flightKey;
      });
      if (!selectedFlight) {
        return;
      }
      selectedFlight.uniqueKey = `${item.flightKey}|${item.AlertType}|${item.NewValue}|${item.OldValue}`;

      switch (mappingData[item.AlertType].iconClass) {
        case 'missing-bag-black':
          mappingData[item.AlertType].dataLine1 = `${selectedFlight.missingBags} missing bags`;
          selectedFlight.uniqueKey = `${item.flightKey}|${item.AlertType}`;
          break;
        case 'noname-bag-black':
          mappingData[item.AlertType].dataLine1 = `${selectedFlight.noNameBags} no-name bags on`;
          selectedFlight.uniqueKey = `${item.flightKey}|${item.AlertType}`;
          break;
        case 'delayed-black':
          mappingData[item.AlertType].dataLine1 = `Delayed ${item.NewValue}`;
          break;
        case 'flight-cancelled-black':
          mappingData[item.AlertType].dataLine1 = `Cancelled ${item.NewValue}`;
          break;
      }
      return new Promise((resolve, reject) => {

      });
      div

      let obj: any = {
        flightKey: item.flightKey,
        alertType: item.AlertType,
        newValue: item.NewValue,
        oldValue: item.OldValue,
        uniqueKey: selectedFlight.uniqueKey,
        flightNumber: `${selectedFlight.carrierCode} ${selectedFlight.flightNumber}-${selectedFlight.dayDate}`,
        gateNumber: selectedFlight.deptGate,
        destStation: selectedFlight.route.split('-')[1],
        etd: this.bccDatePipe.transform(selectedFlight.etd, 'diffBoth'),
        updatedTime: item.UpdatedTime,
        classname: mappingData[item.AlertType]?.bgClass,
        iconClassname: mappingData[item.AlertType]?.iconClass,
        dataLine1: mappingData[item.AlertType]?.dataLine1
      }
      obj.etdLabel = obj.etd.includes('+') ? 'OUT' : 'TTD';

      switch (mappingData[item.AlertType].iconClass) {
        case 'equipment-change-black':
          obj.newValue = item.NewValue.split('|')[0];
          obj.acftId = item.NewValue.split('|')[1];
          break;
      }
      if (!this.isAlertTimeRange(obj.iconClassname, selectedFlight) && item.AlertType !== 'FlightCancelled') {
        this.removeNotifications(dataObj);
        return;
      }
      this.bccToastService.addNotification(obj);
      this.bccToastService.sortNotifications(sessionStorage.getItem('notificationSortType') ?? 'etd');
      if (type === 'subscription') {
        this.updateNotificationsData(flightDetailsData);
        this.bccToastService.removePopup(obj.uniqueKey);
        this.bccToastService.addPopup(obj);
      }
      if (
        obj.iconClassname === 'gate-change-black' ||
        obj.iconClassname === 'equipment-change-black' ||
        obj.iconClassname === 'delayed-black' ||
        obj.iconClassname === 'flight-cancelled-black'
      ) {
        this.newOldValueChange(obj, flightDetailsData);
      }
      if (obj.iconClassname === 'missing-bag-black' || obj.iconClassname === 'noname-bag-black') {
        this.addExceptionIcon(obj, flightDetailsData);
      }
    });
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
updateNotificationsData(flightDetailsData: any): void {
    this.bccToastService.notifications.forEach(toast => {
      const selectedFlight = flightDetailsData.find((flight: any) => {
        return toast.flightKey === flight.flightKey;
      });
      toast.gateNumber = selectedFlight.deptGate;
      toast.destStation = selectedFlight.route.split('-')[1];
      toast.etd = this.bccDatePipe.transform(selectedFlight.etd, 'diffBoth');
      toast.etdLabel = toast.etd.includes('+') ? 'OUT' : 'TTD';
    });
  }///+++++++++++++++++++++++++++++++cach use SUBJECT+++++++++++++++++++++++++++++++++
step1: bcc-header.component.ts

this.sharedDataService.stationErrorFlagEnable.next(true);

step2: sharedDataService.component.ts

stationErrorFlagEnable: Subject<any> = new Subject<string>();

step3: consume component - flight-filter-results.component.ts
ngOnInit() {
    if (sessionStorage.getItem('setStation')) {
      this.showMobileStationPage = false;
    }
    this.sharedDataService.stationErrorFlagEnable.subscribe(flag => {
      this.stationErrorFlag = flag;
    });
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++
  public filterFlag = {
    flightFilter: true,
    baggageFilter: false,
    lookupFilter: false,
    lookupBaggageFilter: false,
    bagDetailsMobile: false,
  };
  public filterFlagChange = new BehaviorSubject<any>(this.filterFlag);

//+++++++++++++++++++++++++++++++filter only station value++++++++++++++++++++

this.stations = this.stationDetails.map((val: any) => val.station);//resuts: [ORD, SFO, EWR]
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
if (sessionStorage.getItem('flightFilters')) {
          const data = JSON.parse(sessionStorage.flightFilters);
          console.log("mydatat>>> ", data)
          this.fstartDateTime = (data.fstartDateTime != "") ? data.fstartDateTime : this.fstartDateTime;
          this.fendDateTime = (data.fendDateTime != "") ? data.fendDateTime : this.fendDateTime;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

this.bccToastService.sortNotifications(sessionStorage.getItem('notificationSortType') ?? 'etd');
mean statement above: if ((sessionStorage.getItem('notificationSortType') = true) and then
this.bccToastService.sortNotifications('etd');///Not sure
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
bbc-toast.service.ts service file:
  export class BccToastService {

  constructor() { }
  notifications: any[] = [];

bcc-header.component.ts file:

  constructor(
      public toastService: BccToastService
    ) { }

  bcc-header.component.html
  <div class="custom-badge custom-badge-menu-desktop">
    <p>
      {{ toastService.notifications.length }}
    </p>
  </div>
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  consume file:
  this.sharedDataService.realTimeUpdateTrigger.subscribe(() => {
      if (sessionStorage.getItem('flightDetailsData')) {
        this.flightDetailsData = JSON.parse(sessionStorage.flightDetailsData);
      }
    }
  provide file:
  sessionStorage.setItem('flightDetailsData', JSON.stringify(flightDetailsData));
  this.realTimeUpdateTrigger.next();
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
this.checkedGateList = (data.checkedGateList.length > 0) ? data.checkedGateList : this.checkedGateList;
///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

while (flightKeysArray.length) {
        const flightKeysArraySpliced = flightKeysArray.splice(0, 10);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
removePopup(uniqueKey: any): void {
    this.popups = this.popups.filter(toast => toast.uniqueKey !== uniqueKey);
  }
  //++++++++++++++++++++++++++MAP object++++++++++++++++++++++++++++++++++++++++++++++++
  const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));
// expected output: 1

map1.set('a', 97);

console.log(map1.get('a'));
// expected output: 97

console.log(map1.size);
// expected output: 3

map1.delete('b');

console.log(map1.size);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
this.flightDetailsData.forEach((row: any) => {
                    row.flightDetails.forEach((flightDetail: any) => {
                      flightDetail.sch = flightDetail.localScheduledDepartureDate;
                      flightDetail.etd = flightDetail.localEstimatedDepartureDate;
                    });
                  });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                  element.tierCustomerName = `${this.addGroupTierToData(element.groupTier)}${element.customerName}`;
  </body>
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  goToAssignmentDetails(flight: any) {
    const params = {
      data: flight,
      status: "Open",
    };
  UtilityService.setBagViewParams(params);

  UtilityService.getBagViewParams(params);

  public static setBagViewParams(params: any): void {
    localStorage.setItem('assignment_details_params', JSON.stringify(params));
  }

  public static getBagViewParams(): any {
    return (localStorage.getItem('assignment_details_params') != null) ? JSON.parse(localStorage.getItem('assignment_details_params')) : null;
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (key.layoverDetail.length > 0) {
                    for (let i in key.layoverDetail) {
                      //for (let i = 0; i < key.layoverDetail.length; i++) {
                      if (key.layoverDetail[i].historyTimestamp != null) {
                        key.layoverDetail[i].historyTimestamp = moment(key.layoverDetail[i].historyTimestamp).format("MM/DD");
                      }
                    }
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  public static setAllFlightKeys(flightArray: any, key: string) {
    // let myFlight =[]
    // for (let flight of flightArray){
    //   console.log("flight>>", flight)
    //  myFlight.push(flight.flightKey)
    // }
    // console.log("myFlight>> ", myFlight)
    let flightKeyArray = [];
    if (typeof flightArray != undefined && flightArray != null && flightArray.length > 0) {
      flightKeyArray = flightArray.map(f => f[key]);
      console.log("flightKeyArray>> ", flightKeyArray)
    }
    localStorage.setItem("allFlightKeys", JSON.stringify(flightKeyArray));
  }
  public static getAllFlightKeys(): any {
    return (localStorage.getItem("allFlightKeys") != null) ? JSON.parse(localStorage.getItem("allFlightKeys")) : [];
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  {{ getBagTagType() }} from template html


  getBagTagType(): string {
    return UtilityService.getBagViewParams()["status"];
  }
  Note: call getBagViewParams() and get STATUS value
  data:
{flightKey: 'UA380:20221003:ORD', carrierCode: 'UA', flightNumber: '380', flightNumberWithCode: 'UA 380', localScheduledDepartureDate: '2022-10-03T13:15:00-05:00', …}
status: "Open"
//++++++++++++++++++++++++++++++++++++++++++++++++++++
[ngStyle]="{'min-height':showHistory === false ? '100px' : '100px' }"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<tbody class="main-table-body">
                        <ng-container *ngFor="let data of flightDetailsData; let i = index">
                            <tr class="main-table-sub-header">
                                <td colspan="16">
                                    <span class="header-title">{{ data.routeName }} | {{ data.date }}</span>
                                    <p class="sub-header-link" (click)="navAllFlight()">
                                        <span class="text-link-enabled" *ngIf="i === 0">See all {{ stationCode }}
                                            flights today</span>
                                        <span *ngIf="i === 0">
                                            <i class="chevron-right-icon"></i>
                                        </span>
                                    </p>
                                </td>
                            </tr>
                            <tr class="main-table-details" *ngFor="let flight of data?.flightDetails;"
                                (click)="baggageDetails(flight)">
                                <td>
                                    <i *ngIf="flight?.etd | bccDate: 'isRedIcon'" class="clock-icon"></i>
                                    <i *ngIf="flight?.etd | bccDate: 'isOrangeIcon'" class="clock-orange-icon"></i>
                                </td>
                            </tr>
                            ......//
//++++++++++++++++++++++++++++++++++++++++++++++++
if (this.bagsPopupDetail.bagItinerary.itrType === "NOREC") {
                this.noRecFlag = true;
              }
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      localStorage.setItem("stationCode", this.stationModel ?? '');
      //+++++++++++++++++++++++++++++++++++++++++++++++++++
      if (res.statusCode == "200" || res.message == "Success") {
                this.bagHistory = [];
                this.passengerHistory = [];
                this.bagHistory = res.response.bagHistory;
                this.passengerHistory = res.response.passengerHistory;
                this.passengerDetails = res.response.passenger;//object
                this.checkConnectingFlight();
              }
              else {
                this.bagHistory = [];
                this.passengerHistory = [];
                this.passengerDetails = null;//object
</html>
sessionStorage.setItem('flightFilters', JSON.stringify(filterModel));
let filterModel: any = {
      fstartDateTime: this.fstartDateTime,
      fendDateTime: this.fendDateTime,
      selectedTimeZone: this.selectedTimeZone,
      showConnection: this.showConnection,
      showConnectionValue: this.showConnectionValue,
      selectedConnectionText: this.selectedConnectionText,
      selectedZones: sZone,
      selectedGates: this.checkedGateList.map((gate: any) => gate.id),
      selectedTimeRange: this.selectedTimeRange,
      zoneList: this.zoneList,
      checkedGateList: this.checkedGateList,
      fstartTime: this.fstartTime,
      fendTime: this.fendTime,
      offset: this.offSetValue?.offset
    }
//+++++++++++++++++++++++++++++++++++++++++++++++++++
localStorage.setItem("stationCode", this.stationModel ?? '');
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
getCheckedItemListGate = () => {
    this.checkedGateList = [];
    this.gateIndexObj = "";
    this.gateShowValue = [];
    let gateCount = 0;
    this.gateList.forEach((zone: any) => {
      zone.gates.forEach((gate: any) => {
        if (gate.isGateSelected) {
          this.checkedGateList.push(gate);
        }
        gateCount++;
      });
    });

    this.checkedGateList?.forEach((gate: any) => {
      if (gate.isGateSelected) {
        this.gateShowValue.push(gate.id);
      }
    });

    if (this.checkedGateList?.length == 0) {
      this.gateIndexObj = "None";
    } else if (this.checkedGateList?.length < 3) {
      this.gateIndexObj = this.gateShowValue;
    } else if (this.checkedGateList?.length === gateCount) {
      this.gateIndexObj = `All (${this.checkedGateList?.length})`;
    } else {
      this.gateIndexObj = `Multi (${this.checkedGateList?.length})`;
    }
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Check All Checkbox Checked
    isAllSelected = () => {
    this.masterSelected = this.zoneList?.every(function (item: any) {
      return item.isSelected;
    })
    <div *ngIf="showZones" class="zones-options" #zoneOptions>
                <div>
                  <input type="checkbox" class="form-check-input bcc-check-box" [(ngModel)]="masterSelected"
                    name="list_name" value="m1" (change)="zoneCheckUncheckAll()" />
                  <span class="all-zone-label">All</span>
                </div>
    </div>
    //+++++++++++++++++++++++++++++++++++++++++++++++++
    When to use Any in TypeScript
Use the any type when there are no other options, and there are no type definitions available for that particular piece of code you’re working with.

For instance, if our coupon was perhaps a variable from some place other than the code we’ve written, it could be expecting either a string, number, or even boolean.

These are all entirely possible and valid values for a coupon variable, depending on scenario:

let coupon: any;

coupon = 26;
coupon = 'DEAL26';
coupon = true;
There you have it. When to use the any type, when you have no other option. And yes, we know, you can use it if you want to - but good habits create better code and proper type definitions will greatly benefit any codebase.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export class DiscoveryLandingPageComponent implements OnInit {
  landingPageArr:any = [];
  landingData:any = {};
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getLandingPageData()
  }
  getLandingPageData(){
    this.landingPageArr = [];
    this.landingData = this.dataService.landingPageData();
    this.landingPageArr = this.landingData.responseList;

  }
  //+++++++++++++++++++++++++++++
  import { tap, catchError } from 'rxjs/operators';
  //+++++++++++++++++++++++++++++++++++++
  import { Post } from './post.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn:'root'})

export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient){

    }

    createAndStorePost(title, content){
        const postData:Post={title: title, content:content}
       return this.http.post('https://ng-complete-guide-b7587-default-rtdb.firebaseio.com/posts.json', postData)
        .pipe(map(responseData=> {
            console.log('responseObject>> ', responseData)
            const dataArray=[];
            for ( const key in responseData){
                dataArray.push({...responseData[key], id: key})
            }
            return dataArray
        }))
        .subscribe( res => {
            console.log('res>>> ',res)
        }, error => {
            this.error.next(error.message)
        })
    }
    fetchPosts(){

       return this.http.get<{ [key:string]: Post; }>('https://ng-complete-guide-b7587-default-rtdb.firebaseio.com/posts.json')
        .pipe(
          map(responseData => {
            const postsArray: Post[] =[]
            for (const key in responseData){
           //   if(responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key], id:key})
           //   }
            }
            return postsArray;
          },
          catchError( errorRes => {
           return throwError(errorRes)
          })
          )
        )
        // .subscribe(posts => {

        //   console.log('my post>> ', posts);

        // })
      }
      deletePosts(){
         return this.http.delete('https://ng-complete-guide-b7587-default-rtdb.firebaseio.com/posts.json')
      }

}

//++++++++++++
onFetchPosts() {
    // Send Http request
  //  this.postService.fetchPosts()
  this.isFetching = true;
  this.postsService.fetchPosts().subscribe(posts => {
    this.isFetching = false;
    this.loadedPosts = posts;
  }, error => {
    this.isFetching = false
    console.log('errors >> ', error)
    this.error = error.message
  })

  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  let sZone = this.zoneList.filter((item: any) => item.isSelected).map((i: any) => i.id);
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return this.http.post<any>(this.config.baseApiUrl + version + AppUrl.api_urls.filterFDT, body, { headers }).pipe(
      map(this.extractData),
      catchError((error) => this.handleError(error)
      ));
      ....////////
      private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //get specific record for flight user selected from dropdown menu
  .subscribe((res)=> {
      this.baggageDetailsData = [];
      this.baggageDetailsData = res.response.bagDetails;

      for (let bag of this.baggageDetailsData){
        if (bag.flightNumber == this.flightNumber){
          this.baggageDetailsData =bag;
          this.baggageDetailsData = [this.baggageDetailsData];
        }
      }
    })
    ///////////////////////////////////////////////////////////////

import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
------
import { LoggingService } from './logging.service';

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
+++++++++++++++++++++++++++++++++++++++++++++
ngAfterViewInit(){
  this.checkCustomerType();
      // To focus the error on state selector - Start
      setTimeout(()=>{
        const el = this.elementRef.nativeElement.querySelector('#state-dropdown-id');
        this.renderer2.listen(el, 'keydown', (event) => {
          const stateVal = el.value;
            if((event.keyCode === 9 || event.code === 'Tab') && (stateVal === 'null')) {
              setTimeout(()=>{
                const errElem = document.querySelector('#state-dropdown-id-error') as HTMLElement;
                errElem.setAttribute("tabindex","0");
                errElem.focus();
              },100);
            }
        });
        },500);
        // To focus the error on state selector - End
}
+++++++++++++++++++++++++++++++
public formvalidate(selectValue) {
  // Create and sets the state name, to be retrieved in banking screen
  let el = document.createElement("span");
  el.innerHTML = this.selectedState;
  el.hidden = true;
  el.setAttribute('aria-hidden', 'true');
  el.id="selected-state";
  document.getElementsByClassName("sectionBleed")[0].appendChild(el);

  this.myaccform.validate().then(formIsValid => {
    if (formIsValid && selectValue) {
      this.isOptionSelected = true;
      let appName = selectValue.split(' ').join('').toLowerCase();
      if(appName == "creditcard"){
          appName = "credit-card";
      } else if(appName == "certificatesofdeposit"){
        appName = "cd";
    } else if(appName === "checking&savings"){
      appName = "checking-saving";
    }
    this.navigateToPage(appName);
      setTimeout(()=>{
        document.getElementById('check_app_status').scrollIntoView({behavior: "smooth", block: "start"});
      }, 1);
    }
  });
}


