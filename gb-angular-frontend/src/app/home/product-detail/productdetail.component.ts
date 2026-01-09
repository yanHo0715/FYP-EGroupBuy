import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DecimalPipe, DOCUMENT, NgForOf, NgIf, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {Product} from '../../interfaces/product';
import {CartItem} from '../../interfaces/cart-item';
import {FormsModule} from '@angular/forms';
import {ProductPackage} from '../../interfaces/product-package';
import {Wishlist} from '../../interfaces/wishlist';
import {Review} from '../../interfaces/review';
import {ReviewOverallScore} from '../../interfaces/review-overall-score';

@Component({
  selector: 'app-prductdetail',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgStyle,
    DecimalPipe
  ],
  templateUrl: './productdetail.component.html',
  // styleUrl: './productdetail.component.scss'
  styleUrls:['./productdetail.component.scss', '../home.component.scss']
})
export class ProductdetailComponent implements OnInit, OnDestroy{


  productId: number = 0;
  product: Product = {
    product_id: 0,
    title: '',
    creation_date: '',
    sell_style: '',
    description: '',
    image_urls: '',
    brand_id: 0,
    material: '',
    delivery_date: '',
    delivery_method: '',
    delivery_region: '',
    min_threshold: 0,
    stock_quantity: 0,
    stock_status: '',
    status: '',
    cost: 0,
    regular_price: 0,
    sale_price: 0,
    category_id: 0,
    seller_id: 0,
    seller_username: '',
    likes: 0,
    display_position: 0,
    main_image: '',
    brand_name: '',
    category_name: '',
    grpbuy_start: '',
    grpbuy_end: '',
    grpbuy_quantity: 0,
    grpbuy_regular_price: 0,
    grpbuy_sale_price: 0,
    grpbuy_status: '',
    grpbuy_order_count: 0,
    package_grp_count: 0,
    product_item_list: [],
    review_overall_score: {} as any
  };

  // productDescription:string = '';
  productDescription:any;
  selectedQuantity = 1;
  curUserId: number = 0;
  curSymbol: string = '$';
  maxOrderQty: number = 0;
  minThresholdProgress: number = 0;

  // qtyCounter
  otherProdImageUrls: string[] = [];
  displayImage: string = '';
  springServerBaseUrl: string = '';
  display_type: string = '';
  productTimer: any;

  reviewSubject: string = '';
  reviewContent: string = '';
  reviewScore: number = 5;
  // avgSocre: number = 0;
  isPurchased: boolean = false;
  isReviewed: boolean = false
  reviewList: Review[] = [];
  reviewOverallScore: ReviewOverallScore = {} as any;
  avgOverallSore: number = -1;
  score5Count: number = 0;
  score4Count: number = 0;
  score3Count: number = 0;
  score2Count: number = 0;
  score1Count: number = 0;


  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public meta: Meta,
    public title: Title) {           };

  ngOnInit() {

    this.productId = this.route.snapshot.params['pid'];
    this.display_type = this.route.snapshot.params['type'];
    this.curUserId = this.userService.getUserToken().user_id;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
    this.springServerBaseUrl = this.utilityService.getSpringServerApiUrl();
    this.maxOrderQty = this.utilityService.getMaxOrderQty();

    this.userService.getProduct(this.productId).subscribe((response) => {

      // console.log("===== ProductdetailComponent - ngOnInit() this.route.snapshot.params['pid']: ", this.route.snapshot.params['pid']);
      console.log("===== ProductdetailComponent - ngOnInit() this.productId : ", this.productId);
      console.log("===== ProductdetailComponent - ngOnInit() this.display_type : ", this.display_type);

      this.product = response;
      this.displayImage = this.product.main_image;
      this.reviewOverallScore = this.product.review_overall_score as any;
      this.setOverScoreDetail();

      this.otherProdImageUrls = this.getImageUrls(this.product.image_urls);
//      if (this.product.sell_style == 'G' || this.product.sell_style == 'P') {
      if (this.display_type == 'G') {
        if (this.product.grpbuy_end) {
          this.setEndTimeCounter(this.product.grpbuy_end);
        }
        if (this.product.min_threshold > 0) {
          this.minThresholdProgress = ((this.product.grpbuy_order_count / this.product.min_threshold) * 100).toFixed(0) as any;
          if (this.minThresholdProgress > 100) {
            this.minThresholdProgress = 100;
          }

        } else {
          this.minThresholdProgress = 100;
        }
      }

      console.log("===== ProductdetailComponent - ngOnInit() this.product: ", this.product);
      console.log("===== ProductdetailComponent - ngOnInit() this.reviewOverallScore: ", this.reviewOverallScore);

      // Angular sanitization and security contexts checking for inserting html contexts
      this.productDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.description);

      if (this.userService.getUserToken().user_id) {
        this.userService.isPurchasedProduct(this.productId).subscribe(response => {
          this.isPurchased = response;
        });
      }

      this.getBuyerReviews();

      // this.getIsWishlisted();
    });

    this.addJScriptStmt(this.appendJScriptStmt01());
  }

  qtyCounter(i: number) {
    return new Array(i);
  }

  ngOnDestroy() {
    clearInterval(this.productTimer);
  }

  addItemToCart(pdt: Product){
    console.log("===== Productdetail Component - addToCart() : ", pdt);
    console.log("===== Productdetail Component - selectedQuantity : ", this.selectedQuantity);

    let cartItem: CartItem = {
      buyer_id: this.curUserId,
      product_id: pdt.product_id,
      product_title: pdt.title,
      // package_id: 0,
      // package_name: '',
      seller_id: pdt.seller_id,
      seller_username: pdt.seller_username,
      quantity: this.selectedQuantity,
      unit_price: this.display_type == 'G'? pdt.grpbuy_sale_price? pdt.grpbuy_sale_price: 0: pdt.sale_price? pdt.sale_price: 0 as any,
      sub_Total: (this.display_type == 'G'? pdt.grpbuy_sale_price? pdt.grpbuy_sale_price: 0: pdt.sale_price? pdt.sale_price: 0 as any) * this.selectedQuantity,
      //sell_type: (pdt.sell_style == 'S') ? 'S' : pdt.sell_style,
      sell_type: this.display_type,
      item_image_url: pdt.main_image,
      grpbuy_end: pdt.grpbuy_end
    };
    this.userService.addItemToCart(cartItem).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to cart");
      this.userService.toRefreshCart();

      if (this.display_type == 'S') {
        this.product.stock_quantity = this.product.stock_quantity - this.selectedQuantity;
      }

      if (this.display_type == 'G') {
        this.product.grpbuy_quantity = this.product.grpbuy_quantity - this.selectedQuantity;
      }

    });

  }

  getImageUrls(imgUrlList: string) :string[] {

    let outUrls: string[] = [];

    if (imgUrlList) {
      outUrls = imgUrlList.split(';');
      outUrls = [this.product.main_image].concat(outUrls);
    } else {
      outUrls = [this.product.main_image].concat(outUrls);
    }

    console.log("===== Productdetail Component - outUrls : ", outUrls);

    return outUrls;

  }

  displayThumbnailImage(index: number): string {
    let imageUrl = '';

    if (index==0) {
      imageUrl = this.otherProdImageUrls[0];
    } else {
      imageUrl= this.springServerBaseUrl + '/' + this.otherProdImageUrls[index];
    }

    return imageUrl;

  }

  onChangeImage(index: number) {
    if (index==0) {
      this.displayImage = this.otherProdImageUrls[0];
    } else {
      this.displayImage = this.springServerBaseUrl + '/' + this.otherProdImageUrls[index];
    }
  }

  setEndTimeCounter(endTime:string){

    //const finaleDate: number = new Date("March 2, 2025 00:00:00").getTime();
    const finaleDate: number = new Date(endTime).getTime();
    // console.log("===== PackageGrid Component - setEndTimeCounter() endTime: ", endTime);
    // console.log("===== PackageGrid Component - setEndTimeCounter() finaleDate: ", finaleDate);

//    const timer = (): void => {
    let timer = (): void => {
      const now: number = new Date().getTime();
      let diff: number = finaleDate - now;

      // console.log("===== PackageGrid Component - setEndTimeCounter() : ", diff);

      if (diff < 0) {
        const alertElement = document.querySelector('.alert') as HTMLElement;
        const containerElement = document.querySelector('.container') as HTMLElement;
        if (alertElement) alertElement.style.display = 'block';
        if (containerElement) containerElement.style.display = 'none';
      }

      let days: string | number = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours: string | number = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      let minutes: string | number = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      let seconds: string | number = Math.floor(diff % (1000 * 60) / 1000);

      // days = days <= 99 ? `0${days}` : days;
      // days = days <= 9 ? `00${days}` : days;
      // hours = hours <= 9 ? `0${hours}` : hours;
      // days = days <= 99 ? `0${days}` : days;
      days = days <= 9 ? `${days}` : days;
      hours = hours <= 9 ? `${hours}` : hours;
      minutes = minutes <= 9 ? `0${minutes}` : minutes;
      seconds = seconds <= 9 ? `0${seconds}` : seconds;

      const daysElement = document.querySelector('#days') as HTMLElement;
      const hoursElement = document.querySelector('#hours') as HTMLElement;
      const minutesElement = document.querySelector('#minutes') as HTMLElement;
      const secondsElement = document.querySelector('#seconds') as HTMLElement;

      if (daysElement) daysElement.textContent = days as string;
      if (hoursElement) hoursElement.textContent = hours as string;
      if (minutesElement) minutesElement.textContent = minutes as string;
      if (secondsElement) secondsElement.textContent = seconds as string;
    }

    timer();
    this.productTimer = setInterval(timer, 1000);

  }


  private addJScriptStmt(scriptStr: string) {
    let scriptStmt = this._renderer2.createElement('script');
    //script.type = `application/ld+json`;
    scriptStmt.text = scriptStr;
    this._renderer2.appendChild(this._document.body, scriptStmt);
  }


  private appendJScriptStmt01() : string {
    let appendJScriptStmt: string = '';

    appendJScriptStmt = `
        const current = document.getElementById("current");
        const opacity = 0.6;
        const imgs = document.querySelectorAll(".img");
        imgs.forEach(img => {
            img.addEventListener("click", (e) => {
                //reset opacity
                imgs.forEach(img => {
                    img.style.opacity = 1;
                });
                current.src = e.target.src;
                //adding class
                //current.classList.add("fade-in");
                //opacity
                e.target.style.opacity = opacity;
            });
        });
    `;

    return appendJScriptStmt;
  }

  addWishlistItem(p :Product) {
    console.log("===== ProductdetailComponent - addWishlistItem() : ", p);

    let wishlist: Wishlist = {
      user_id: this.curUserId,
      product_id: p.product_id,
      product_title: p.title,
      // regular_price: p.regular_price,
      // sale_price: p.sale_price,
      // product_image: p.main_image,
      // stock_status: p.stock_status,
      // sell_type: p.sell_style
      sell_type: this.display_type,
      product_image: ''
    };
    console.log("===== ProductdetailComponent - addWishlistItem() : ", wishlist);
    this.userService.addWishlistItem(wishlist).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to wishlist");
      this.userService.toRefreshWishlist();
    });
  }

  addUserReview() {

    let curDateTime = new Date();

    console.log("===== User Review reviewSubject ", this.reviewSubject);
    console.log("===== User Review reviewScore ", this.reviewScore);
    console.log("===== User Review reviewContent ", this.reviewContent);

    let review: Review = {
      review_id: 0,
      review_subject: this.reviewSubject,
      poster_id: this.userService.getUser().user_id,
      poster_username: this.userService.getUser().username ? this.userService.getUser().username: 'anonymous',
      product_id: this.productId,
      score: this.reviewScore,
      review_content: this.reviewContent,
      product_title: this.product.title,
      package_id: 0,
      package_name: '',
      seller_id: this.product.seller_id,
      seller_username: this.product.seller_username,
      post_date: curDateTime.toISOString(),
      status: 'ACTIVE',
      poster_icon: ''
    }
    this.userService.addUserReview(review).subscribe(response => {
      this.utilityService.toastify(response, "Review has been Posted");

      this.reviewSubject = '';
      this.reviewContent = '';
      this.reviewScore = 5;
      this.getBuyerReviews();
    });
  }

  getBuyerReviews() {
    this.userService.getBuyerReviews(this.productId).subscribe(response => {
      this.reviewList = response;

      console.log("===== User Review list", this.reviewList);

      // let totalScore = 0;
      // let givenScore = 0;
      // for (let r of this.reviewList) {
      //   totalScore += 5;
      //   givenScore += r.score;
      // }
      // this.avgSocre = givenScore / totalScore * 100 ;
    });
  }

  setOverScoreDetail() {

    if(this.reviewOverallScore) {
      this.avgOverallSore = this.reviewOverallScore.total_review_count? (this.reviewOverallScore.total_review_score / this.reviewOverallScore.total_review_count): -1;
      this.score5Count = this.reviewOverallScore.total_score5_count;
      this.score4Count = this.reviewOverallScore.total_score4_count;
      this.score3Count = this.reviewOverallScore.total_score3_count;
      this.score2Count = this.reviewOverallScore.total_score2_count;
      this.score1Count = this.reviewOverallScore.total_score1_count;
    }
  }


}
