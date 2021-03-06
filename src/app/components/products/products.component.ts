import { Component, OnInit } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { LayoutService } from '../../services/layout.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  backgroundColor: string;
  headlineColor: string;
  warningColor: string;
  successColor: string;
  navbarColor: string;
  teaserColor: string;
  buttonColor: string;
  errorColor: string;
  alertColor: string;
  infoColor: string;
  linkColor: string;
  textColor: string;

  searchResults: string[];
  loading: boolean;
  url: string;
  limit: number;
  page: number;
  error: any = {};
  products: any = [];
  userId: string;
  query: string;
  sub: any;

  constructor(private route: ActivatedRoute,
    private http: Http,
    private layout: LayoutService,
    private data: DataService,
    private auth: AuthService) {
    this.data.changeIsPublicPage(true);
    this.data.currentUserId.subscribe(userId => this.userId = userId);
    this.data.currentSearchResults.subscribe(searchResults => this.products = searchResults);

    this.layout.currentBackgroundColor.subscribe(backgroundColor => this.backgroundColor = backgroundColor);
    this.layout.currentHeadlineColor.subscribe(headlineColor => this.headlineColor = headlineColor);
    this.layout.currentWarningColor.subscribe(warningColor => this.warningColor = warningColor);
    this.layout.currentSuccessColor.subscribe(successColor => this.successColor = successColor);
    this.layout.currentNavbarColor.subscribe(navbarColor => this.navbarColor = navbarColor);
    this.layout.currentTeaserColor.subscribe(teaserColor => this.teaserColor = teaserColor);
    this.layout.currentButtonColor.subscribe(buttonColor => this.buttonColor = buttonColor);
    this.layout.currentAlertColor.subscribe(alertColor => this.alertColor = alertColor);
    this.layout.currentErrorColor.subscribe(errorColor => this.errorColor = errorColor);
    this.layout.currentTextColor.subscribe(textColor => this.textColor = textColor);
    this.layout.currentInfoColor.subscribe(infoColor => this.infoColor = infoColor);
    this.layout.currentLinkColor.subscribe(linkColor => this.linkColor = linkColor);

    this.url = environment.apiUrl;
  }

  ngOnInit() {
    this.loading = true;
    this.limit = -1;
    this.page = 1;
    this.getAllProducts();
  }

  getAllProducts() {
    this.loadProducts(this.limit, this.page)
      .then((products) => {
        // console.log(products.json().products);
        this.loading = false;
        this.products = products.json().products;
      })
      .catch((err) => {
        console.log(err.json());
        this.error = err.json();
      });
  }

  loadProducts(limit, page) {
    let url: string;
    let headers: Headers;
    const params = new URLSearchParams();

    url = `${this.url}/api/products`;
    headers = new Headers({
      'Content-Type': 'application/json'
    });

    params.append('limit', limit);
    params.append('page', page);

    return this.http.get(url, { params: params, headers: headers }).toPromise();
  }
}
