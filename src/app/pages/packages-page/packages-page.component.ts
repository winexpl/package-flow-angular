import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PackageService } from '../../services/package.service';
import { CommonModule } from '@angular/common';
import { PackageCardComponent } from '../../components/package-card/package-card.component';
import { Package } from '../../interfaces/package.interface';
import { Subject, takeUntil } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-packages-page',
  imports: [
    CommonModule,
    PackageCardComponent,
    MatInput,
    MatFormField,
    MatLabel,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './packages-page.component.html',
  styleUrl: './packages-page.component.css'
})
export class PackagesPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); 
  private packageService = inject(PackageService);
  packages: Package[] = [];
  filtredPackages: Package[] = []

  highlightedPackage: string | null = null;
  highlightedDependencies: string[] = [];

  onHighlight(pkg: any): void {
    this.highlightedPackage = pkg.id;
    this.highlightedDependencies = this.loadDependencies(pkg.id);
  }

  onClearHighlight(): void {
    this.highlightedPackage = null;
    this.highlightedDependencies = [];
  }

  ngOnInit(): void {
    this.loadPackages()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.filtredPackages = this.packages.filter(pkg => pkg.id.match(input));
  }

  loadPackages() {
    this.packageService.getAllPackages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((packages) => {
        this.packages = packages;
        this.filtredPackages = packages;
      })
  }

  loadDependencies(packageId: string) {
    console.log(packageId);
    const pkgIndex = this.packages.findIndex(pkg => pkg.id.match(packageId));
    if(!this.packages[pkgIndex].dependencies) {
      this.packageService.getDependenciesForPackageById(this.packages[pkgIndex].id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((dependencies) => {
        this.highlightedDependencies = dependencies;
        this.packages[pkgIndex].dependencies = dependencies;
      })
    } else this.highlightedDependencies = this.packages[pkgIndex].dependencies;
    console.log(this.highlightedDependencies);
    return this.highlightedDependencies;
  }
}
