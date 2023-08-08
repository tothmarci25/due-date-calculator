import calculateDueDate, {validateArguments, addRemainingWorkingHours} from "./index";


describe('#tests', () => {

    describe('#dueDateCalculation', () => {
        const testCases = [
            { submitDate: new Date('2023-08-11 13:21:17'), turnaround: 120, expectedResult: '2023. 09. 01. 13:21:17' },
            { submitDate: new Date('2023-10-06 13:21:00'), turnaround: 0, expectedResult: '2023. 10. 06. 13:21:00' },
            { submitDate: new Date('2023-10-06 13:21:00'), turnaround: 1, expectedResult: '2023. 10. 06. 14:21:00' },
            { submitDate: new Date('2023-10-06 13:21:00'), turnaround: 4, expectedResult: '2023. 10. 09. 9:21:00' },
            { submitDate: new Date('2023-08-31 16:59:00'), turnaround: 1, expectedResult: '2023. 09. 01. 9:59:00' },
            { submitDate: new Date('2023-11-06 9:00:00'), turnaround: 320, expectedResult: '2024. 01. 01. 9:00:00' },
            { submitDate: new Date('2024-01-01 9:00:00'), turnaround: 2120, expectedResult: '2025. 01. 06. 9:00:00' },
        ];
        testCases.forEach(({ submitDate, turnaround, expectedResult }) => {
            test(`${submitDate} submit date with ${turnaround} turnaround`, () => {
                expect(calculateDueDate(submitDate, turnaround))
                    .toBe(expectedResult);
            });
        });
    });

    describe('#validation', () => {

        test('throwing invalid date error', () => {
            expect(() => validateArguments('asd', 1))
                .toThrow(new Error('Date is invalid'));
        });

        test('throwing invalid date error', () => {
            expect(() => validateArguments(new Date('asd'), 1))
                .toThrow(new Error('Date is invalid'));
        });

        test('throwing required date error', () => {
            expect(() => validateArguments('', 1))
                .toThrow(new Error('Date is required'));
        });

        test('throwing required turnaround error', () => {
            expect(() => validateArguments(new Date(), null))
                .toThrow(new Error('Turnaround is required'));
        });

        test('throwing turnaround must be integer', () => {
            expect(() => validateArguments(new Date(), true))
                .toThrow(new Error('Turnaround must be integer'));
        });
    });

    describe('#remainingWorkingHoursAddition', () => {
        const testCases = [
            {date: new Date('2023-08-10 13:21:00'), hours: 3, expected: '2023. 08. 10. 16:21:00'},
            {date: new Date('2023-08-10 13:21:00'), hours: 4, expected: '2023. 08. 11. 9:21:00'},
            {date: new Date('2023-08-11 13:21:00'), hours: 4, expected: '2023. 08. 14. 9:21:00'}
        ];

        testCases.forEach(({date, hours, expected}) => {
            test(`adding ${hours} hour(s) to ${date.toLocaleString('hu-Hu')}`, () => {
                const result = addRemainingWorkingHours(date, hours)
                expect(result.toLocaleString('hu-Hu')).toBe(expected);
            });
        })
    })
})





