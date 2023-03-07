import { WizardService, WizardStep } from './wizard.service';
import { Observable, reduce } from 'rxjs';
import { take } from 'rxjs/operators';

function buildStep(number: number, valid: boolean = true, ready: boolean = true, title: string = 'Step X'): WizardStep {
  return {number, valid, ready, title};
}

describe('WizardService', () => {
  let underTest: WizardService;

  beforeEach(() => {
    underTest = new WizardService();
  });

  describe('registration & steps property', () => {

    it('must return same Observable instance for multiple calls', () => {
      // given
      const first = underTest.steps;
      // when
      const second = underTest.steps;
      // then
      expect(first).toBeInstanceOf(Observable);
      expect(first).toBe(second);
    });

    it('must emit an empty array if no steps registered', (done) => {
      // given
      // when
      underTest.steps.subscribe({
        // then
        next: actual => {
          expect(actual).toEqual([]);
          done();
        },
        error: err => done.fail(err)
      });
    });

    it('must emit a singleton array with exactly one registered step', (done) => {
      // given
      const step: WizardStep = buildStep(42);
      underTest.register(step);

      // when
      underTest.steps.subscribe({
        // then
        next: actual => {
          expect(actual).toEqual([step]);
          done();
        },
        error: err => done.fail(err)
      });

    });

    it('must emit a sorted array with all registered steps if new step registered', (done) => {
      // given
      const firstStep = buildStep(1);
      const secondStep = buildStep(2);
      const thirdStep = buildStep(3);
      const registrationQueue = [
        secondStep,
        thirdStep,
        firstStep,
      ];
      // when
      // ... early subscription
      underTest.steps.pipe(
        take(registrationQueue.length + 1), // all future registrations and initial value
        reduce((previous, current) => [...previous, current], [] as WizardStep[][]),
      ).subscribe({
        // then
        next: stepsHistory => {
          console.log(stepsHistory);
          expect(stepsHistory).toEqual([
            [],
            [secondStep],
            [secondStep, thirdStep],
            [firstStep, secondStep, thirdStep],
          ]);
          done();
        },
        error: err => done.fail(err)
      });

      // ... late registration
      registrationQueue.forEach(step => underTest.register(step));
    });

    it('must emit an update if known step has been modified', (done) => {
      // given
      const firstStep = buildStep(42);
      const secondStep = buildStep(4711);
      const updatedStep = buildStep(firstStep.number, !firstStep.valid);
      const oldSteps = [
        firstStep,
        secondStep,
      ];
      // when
      // ... early subscription
      underTest.steps.pipe(
        take(oldSteps.length + 2), // initial value, all initial registrations and update of existing registration
        reduce((previous, current) => [...previous, current], [] as WizardStep[][]),
      ).subscribe({
        // then
        next: actual => {
          expect(actual).toEqual([
            [],
            [firstStep],
            [firstStep, secondStep],
            [updatedStep, secondStep],
          ]);
          done();
        },
        error: err => done.fail(err)
      });

      // ... late registrations
      oldSteps.forEach(step => underTest.register(step));
      underTest.register(updatedStep);
    });

    it('must emit an array with all registered steps ordered by step number (ascending)', (done) => {
      // given
      const steps = [
        buildStep(9999),
        buildStep(23),
        buildStep(4711),
        buildStep(42),
      ];
      const expected = steps.map(step => step.number).sort();
      steps.forEach(step => underTest.register(step));

      // when
      underTest.steps.subscribe({
        // then
        next: actual => {
          expect(actual.map(step => step.number)).toEqual(expected);
          done();
        },
        error: err => done.fail(err)
      });
    });

  });

  describe('first & last steps', () => {

    it('must return same Observable instance for multiple calls', () => {
      // given & when & then
      expect(underTest.first).toBeInstanceOf(Observable);
      expect(underTest.last).toBeInstanceOf(Observable);
      expect(underTest.first).toBe(underTest.first);
      expect(underTest.last).toBe(underTest.last);
    });

    it('must emit distinct changes for first step', (done) => {
      // given
      const registrationQueue = [
        buildStep(2),
        buildStep(3),
        buildStep(1),
      ];
      const expected = [2, 1];
      // when
      // ... early subscription
      underTest.first.pipe(
        take(expected.length),
        reduce((previous, current) => [...previous, current.number], [] as number[]),
      ).subscribe({
        // then
        next: actual => {
          expect(actual).toEqual(expected);
          done();
        },
        error: err => done.fail(err)
      });

      // ... late registrations
      registrationQueue.forEach(step => underTest.register(step));
    });

    it('must emit distinct changes for last step', (done) => {
      // given
      const registrationQueue = [
        buildStep(3),
        buildStep(1),
        buildStep(4),
      ];
      const expected = [3, 4];
      // when
      // ... early subscription
      underTest.last.pipe(
        take(expected.length),
        reduce((previous, next) => [...previous, next.number], [] as number[]),
      ).subscribe({
        // then
        next: actual => {
          expect(actual).toEqual(expected);
          done();
        },
        error: err => done.fail(err),
      });

      // ... late registrations
      registrationQueue.forEach(step => underTest.register(step));
    });

  });

  describe('step selection', () => {

    it('must return same Observable instance for multiple calls', () => {
      // given & when & then
      expect(underTest.selected).toBeInstanceOf(Observable);
      expect(underTest.selected).toBe(underTest.selected);
    });

    it('must emit selected step number for late subscribers', (done) => {
      // given
      const expectedStep = buildStep(42);
      underTest.register(expectedStep);
      // when
      underTest.select(expectedStep.number);
      // then
      // ... late subscription
      underTest.selected.subscribe({
        next: actual => {
          expect(actual).toBeTruthy();
          expect(actual).toEqual(expectedStep.number);
          done();
        },
        error: err => done.fail(err)
      });
    });

    describe('when triggered by step registration', () => {

      it('must emit first known step before first selection', (done) => {
        // given
        const expectedStep = buildStep(23);
        underTest.register(expectedStep);
        // when
        underTest.selected.subscribe({
          // then
          next: selected => {
            expect(selected).toBeTruthy();
            expect(selected).toEqual(expectedStep.number);
            done();
          },
          error: err => done.fail(err)
        });
      });

      it('must emit first registered step after each registration of new "previous" step', (done) => {
        // given
        const registrationQueue = [
          buildStep(2),
          buildStep(3),
          buildStep(1),
          buildStep(4),
        ];
        const expected = [2, 1];
        // when
        // ... early subscription
        underTest.selected.pipe(
          take(expected.length), // two distinct selection changes plus initial null
          reduce((previous, selectedStep) => [...previous, selectedStep], [] as (number | null)[]),
        ).subscribe({
          // then
          next: selected => {
            expect(selected).toEqual(expected);
            done();
          },
          error: err => done.fail(err)
        });

        // ... late registrations
        registrationQueue.forEach(step => underTest.register(step));
      });

    });

    describe('when forced by "select()" call', () => {

      const expectations: { title: string, registrationQueue: WizardStep[], forcedSelections: number[], expectedSelections: number[] }[] = [
        {
          title: 'prevent selection of steps with invalid predecessor(s): directly invalid predecessor',
          registrationQueue: [
            buildStep(1, true),
            buildStep(2, true),
            buildStep(3, false),
            buildStep(4, true),
          ],
          forcedSelections: [2, 3, 4, 2],
          expectedSelections: [1, 2, 3, 2],
        },
        {
          title: 'prevent selection of steps with invalid predecessor(s): transitively invalid predecessor',
          registrationQueue: [
            buildStep(1, true),
            buildStep(2, false),
            buildStep(3, true),
            buildStep(4, true),
          ],
          forcedSelections: [2, 3, 4, 1],
          expectedSelections: [1, 2, 1],
        },
        {
          title: 'do not emit redundant selections',
          registrationQueue: [
            buildStep(1, true),
            buildStep(2, true),
          ],
          forcedSelections: [2, 2, 1, 1],
          expectedSelections: [1, 2, 1],
        },
        {
          title: 'prevent selection of unknown steps',
          registrationQueue: [
            buildStep(1, true),
            buildStep(2, true),
          ],
          forcedSelections: [2, 3, 0, 1],
          expectedSelections: [1, 2, 1],
        },
      ];

      expectations.forEach(expectation => {
        it(`must fulfill expectation: ${expectation.title}`, (done) => {
          // given
          // ... early registration
          expectation.registrationQueue.forEach(step => underTest.register(step));
          // when
          underTest.selected.pipe(
            take(expectation.expectedSelections.length),
            reduce((previous, current) => [...previous, current], [] as (number | null)[]),
          )
            .subscribe({
              // then
              next: actual => {
                expect(actual).toEqual(expectation.expectedSelections);
                done();
              },
              error: err => done.fail(err),
            });
          // ... late selection
          expectation.forcedSelections.forEach(stepNumber => underTest.select(stepNumber));
        });
      });

    });

  });

  describe('validity check by number', () => {

    it('must return false when called with unknown step number', () => {
      // given
      const registrationQueue = [
        buildStep(1,),
        buildStep(2,),
      ];
      registrationQueue.forEach(step => underTest.register(step));
      // when & then
      expect(underTest.isValidSync(3)).toBeFalse();
    });

    for (let valid of [true, false]) {
      it(`must return singleton step\'s validity for valid="${valid}"`, () => {
        // given
        underTest.register(buildStep(1, valid));
        // when & then
        expect(underTest.isValidSync(1)).toBe(valid);
      });
    }

    it('must return false when previous step is not valid', () => {
      // given
      const registrationQueue = [
        buildStep(1, false),
        buildStep(2, true),
      ];
      registrationQueue.forEach(step => underTest.register(step));
      // when & then
      expect(underTest.isValidSync(2)).toBeFalse();
    });

    it('must ignore validity of following steps', () => {
      // given
      const registrationQueue = [
        buildStep(1, true),
        buildStep(2, true),
        buildStep(3, false),
      ];
      registrationQueue.forEach(step => underTest.register(step));
      // when & then
      expect(underTest.isValidSync(2)).toBeTrue();
    });

  });

});
