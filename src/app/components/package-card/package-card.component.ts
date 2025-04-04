import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RoundPipe } from "../../pipes/round.pipe";
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-package-card',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    RoundPipe
],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.css'
})
export class PackageCardComponent {
  @Input() package!: any;
  @Input() highlightedPackage!: string | null;
  @Input() highlightedDependencies!: string[];

  @Output() mouseEnter = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();

  onMouseEnter(): void {
    this.mouseEnter.emit();
  }

  onMouseLeave(): void {
    this.mouseLeave.emit();
  }

  get isHighlighted(): boolean {
    return this.highlightedPackage === this.package.id;
  }

  get isDependency(): boolean {
    return this.highlightedDependencies.includes(this.package.id);
  }

  getFirstPart(pkgId: string) {
    const parts = pkgId.split('/');
    if(parts.length > 1)
      return parts[0] + '/';
    return '';
  }

  getSecondPart(pkgId: string) {
    const parts = pkgId.split('/');
    return parts[parts.length - 1];
  }
}
