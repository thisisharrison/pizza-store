import { ObjectUtil } from "../ObjectUtil";

describe("ObjectUtil", () => {
    describe("toArray", function () {
        test("should convert objects to arrays", function () {
            expect(ObjectUtil.toArray({ a: 1, b: 2 })).toEqual([1, 2]);
        });
    });

    describe("reduceByKey", function () {
        test("should sum up count key", function () {
            expect(ObjectUtil.reduceByKey({ a: { count: 1 }, b: { count: 2 } }, "count")).toBe(3);
        });
    });
});
