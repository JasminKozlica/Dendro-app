import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TreeInputComponent } from './tree-input.component';
import { CalculationService } from '../../services/calculation.service';

describe('TreeInputComponent', () => {
  let component: TreeInputComponent;
  let fixture: ComponentFixture<TreeInputComponent>;
  let calculationService: CalculationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeInputComponent, FormsModule],
      providers: [
        {
          provide: CalculationService,
          useValue: {
            calculateVolume: (tree: any) => 100,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeInputComponent);
    component = fixture.componentInstance;
    calculationService = TestBed.inject(CalculationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update tree properties when inputs change', () => {
    const speciesInput = fixture.nativeElement.querySelector('#species');
    const diameterInput = fixture.nativeElement.querySelector('#diameter');
    const heightInput = fixture.nativeElement.querySelector('#height');

    speciesInput.value = 'Hrast';
    diameterInput.value = '20';
    heightInput.value = '10';

    speciesInput.dispatchEvent(new Event('input'));
    diameterInput.dispatchEvent(new Event('input'));
    heightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.tree.species).toBe('Hrast');
    expect(component.tree.diameter).toBe(20);
    expect(component.tree.height).toBe(10);
  });

  it('should call calculateVolume and update resultVolume when calculate is called', () => {
    const calculateSpy = spyOn(calculationService, 'calculateVolume').and.returnValue(123.45);
    const calculateButton = fixture.nativeElement.querySelector('button');

    calculateButton.click();
    fixture.detectChanges();

    expect(calculateSpy).toHaveBeenCalledWith(component.tree);
    expect(component.resultVolume).toBe(123.45);
  });

  it('should display the calculated volume', () => {
    component.resultVolume = 50;
    fixture.detectChanges();
    const volumeDisplay = fixture.nativeElement.querySelector('p');
    expect(volumeDisplay.textContent).toContain('Volume: 50');
  });
});



