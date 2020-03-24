import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface TokenRes {
  data?: any;
}
​
@Injectable()
export class HeadersProvider {
  public static headers: HttpHeaders;
  public static publicHeaders: HttpHeaders;
​
  constructor() {
    HeadersProvider.headers = new HttpHeaders();
    HeadersProvider.publicHeaders = new HttpHeaders();
    this.addBasicHeaders();
    this.addBasicPublicHeaders();}
​
  /**
   * Adds a header to the request headers
   * @method
   * @param key - The key of the header
   * @param value - The value of the header
   */
  protected addHeader(key: string, value: string): void {
    // HttpHeaders.append returns a clone of the headers with the value appened,
    // it does not update the object.You need to set the returned value to the headers.
    HeadersProvider.headers = HeadersProvider.headers.set(key, value);
  }
  protected addPublicHeader(key: string, value: string): void {
    // HttpHeaders.append returns a clone of the headers with the value appened,
    // it does not update the object.You need to set the returned value to the headers.
    HeadersProvider.publicHeaders = HeadersProvider.publicHeaders.set(key, value);
  }
​
  /**
   * Removes the header of the given key
   * @param key = the key of the header
   */
  protected removeHeader(key: string): void {
    HeadersProvider.headers.delete(key);
  }
​
  /**
   * Replaces the header with the given key, with value
   * @param key - the key of the header
   * @param value - the value of the header
   */
  protected replaceHeader(key: string, value: string): void {
    this.removeHeader(key);
    this.addHeader(key, value);
  }
​
  /**
   * Gets the authorization token
   * @method
   * @returns the authorization token
   */
  protected getToken(): any {
    const userDetails = sessionStorage.getItem('userDetails') || localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetails) || null;
    const token = userDetailsObj && userDetailsObj.token ? userDetailsObj.token : null;
    return token;
  }
​
  protected getCheckoutToken(): any {
    const userDetails = sessionStorage.getItem('userDetails') || localStorage.getItem('userDetails');
    const userDetailsObj = JSON.parse(userDetails) || null;
    const checkoutToken = userDetailsObj && userDetailsObj.checkout_token ? userDetailsObj.checkout_token : null;
    return checkoutToken;
  }
​
  /**
   * Adds the headers that are going to be sent in every request
   * @method
   * @returns the authorization token
   */
  protected addBasicHeaders(): void {
    let authToken = this.getToken();
    // tslint:disable-next-line: prefer-const
    let checkout = this.getCheckoutToken();
    this.addHeader('X-Requested-With', 'XMLHttpRequest');
    this.addHeader('Accept', 'application/json');
    this.addHeader('Content-Type', 'application/json');
    if (authToken && authToken !== undefined) {
      authToken = 'token ' + authToken;
      this.addHeader('Authorization', authToken);
    }
​
    if (checkout) {
      this.addHeader('checkout-token', checkout);
    }
  }
​
  /**
   * Adds the headers that are going to be sent in every request
   * @method
   * @returns the authorization token
   */
  protected addBasicPublicHeaders(): void {
    this.addPublicHeader('X-Requested-With', 'XMLHttpRequest');
    this.addPublicHeader('Accept', 'application/json');
    this.addPublicHeader('Content-Type', 'application/json');
  }
​
  protected clearHeaders(): void {
    HeadersProvider.headers = new HttpHeaders();
  }
}