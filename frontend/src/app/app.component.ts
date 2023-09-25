import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestService } from 'src/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  TestValue: Observable<Test> = this.testService.getTest();
  constructor(private testService: TestService) {}
}
