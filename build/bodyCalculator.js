"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BodyCalculator_height, _BodyCalculator_weight, _BodyCalculator_age, _BodyCalculator_sex;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyCalculator = void 0;
class BodyCalculator {
    constructor(height, weight, age, sex) {
        _BodyCalculator_height.set(this, void 0);
        _BodyCalculator_weight.set(this, void 0);
        _BodyCalculator_age.set(this, void 0);
        _BodyCalculator_sex.set(this, void 0);
        __classPrivateFieldSet(this, _BodyCalculator_height, height, "f");
        __classPrivateFieldSet(this, _BodyCalculator_weight, weight, "f");
        __classPrivateFieldSet(this, _BodyCalculator_age, age, "f");
        __classPrivateFieldSet(this, _BodyCalculator_sex, sex, "f");
    }
    leanBodyMass() {
        // For mens
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") === "man") {
            let BLM = (0.3281 * __classPrivateFieldGet(this, _BodyCalculator_weight, "f")) + (0.33929 * __classPrivateFieldGet(this, _BodyCalculator_height, "f")) - 29.5336;
            return +BLM.toFixed(2);
        }
        // For womens 
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") === "woman") {
            let BLM = (0.29569 * __classPrivateFieldGet(this, _BodyCalculator_weight, "f")) + (0.41813 * __classPrivateFieldGet(this, _BodyCalculator_height, "f")) - 43.2933;
            return +BLM.toFixed(2);
        }
    }
    bodyMassIndex() {
        let formula = __classPrivateFieldGet(this, _BodyCalculator_weight, "f") / (__classPrivateFieldGet(this, _BodyCalculator_height, "f") / 100) ** 2;
        return +formula.toFixed(2);
    }
    bodyFatPercentage() {
        // For mens
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "man") {
            let BFP = (1.20 * this.bodyMassIndex() + 0.23 * __classPrivateFieldGet(this, _BodyCalculator_age, "f")) - 16.2;
            return +BFP.toFixed(2);
        }
        // For mens under 15
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "man" && __classPrivateFieldGet(this, _BodyCalculator_age, "f") <= 15) {
            let BFP = 1.51 * this.bodyMassIndex() - 0.70 * __classPrivateFieldGet(this, _BodyCalculator_age, "f") - 2.2;
            return +BFP.toFixed(2);
        }
        // For womens 
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "woman") {
            let BFP = 1.20 * this.bodyMassIndex() + 0.23 * __classPrivateFieldGet(this, _BodyCalculator_age, "f") - 5.4;
            return +BFP.toFixed(2);
        }
        // For womens under 15
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "woman" && __classPrivateFieldGet(this, _BodyCalculator_age, "f") <= 15) {
            let BFP = 1.51 * this.bodyMassIndex() - 0.70 * __classPrivateFieldGet(this, _BodyCalculator_age, "f") + 1.4;
            return +BFP.toFixed(2);
        }
    }
    basal_Metabolic_Rate() {
        let s = 0;
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "man") {
            s = +5;
        }
        if (__classPrivateFieldGet(this, _BodyCalculator_sex, "f") == "woman") {
            s = -161;
        }
        let BMR = (__classPrivateFieldGet(this, _BodyCalculator_weight, "f") * 10) + (__classPrivateFieldGet(this, _BodyCalculator_height, "f") * 6.25) - (__classPrivateFieldGet(this, _BodyCalculator_age, "f") * 5) + s;
        return +BMR.toFixed(2);
    }
}
exports.BodyCalculator = BodyCalculator;
_BodyCalculator_height = new WeakMap(), _BodyCalculator_weight = new WeakMap(), _BodyCalculator_age = new WeakMap(), _BodyCalculator_sex = new WeakMap();
