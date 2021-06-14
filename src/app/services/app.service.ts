import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from "rxjs/operators"

@Injectable()
export class AppService {

  private config;

  constructor(private http: HttpClient) { }

  public static apiEndpoint(): string {
    return environment.apiEndpoint;
  }

  public static getContactAddress(): string {
    return environment.contactAddress;
  }

  public static getLogoUrl(): string {
    return environment.logoUrl;
  }

  public static getClientInfo(): object {
    return environment.clientInfo;
  }

  public loadConfig(): Promise<void> {
    return this.http.get('/assets/app.config.json')
      .toPromise()
      .then((res) => {
          this.config = res
      });
  }

  public getConfig(): object {
    return this.config;
  }

}
