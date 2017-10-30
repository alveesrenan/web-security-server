import { Router } from 'express';

export abstract class AppRoutes {
  protected router: Router;
  protected uri: string;

  constructor(router: Router, uri: string) {
    this.router = router;
    this.uri = uri;
  }

  abstract register(): void;
}
