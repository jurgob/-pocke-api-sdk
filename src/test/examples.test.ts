import { main } from "../examples.js";
import { expect, test ,vi,beforeEach} from "vitest";

beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'dir').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

test("examples main function runs without error", async () => {
    await expect(main()).resolves.not.toThrowError();
});