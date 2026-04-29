import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import {
  join,
  JsonObject,
  normalize,
} from '@angular-devkit/core';
import { writeFile } from 'node:fs/promises';

import { NagerScheduleHolidayDriver } from './driver/public_api';

interface Options extends JsonObject {
  numYears: number;
  output: string;
  country: string;
}

const success = () => ({ success: true });
const failure = (error: unknown) => ({
  success: false,
  error: error instanceof Error ? error.message : String(error),
});

export default createBuilder(downloadHolidaysBuilder);

async function downloadHolidaysBuilder(
  options: Options,
  context: BuilderContext,
): Promise<BuilderOutput> {
  const thisYear = new Date(Date.now()).getUTCFullYear();
  const driver = new NagerScheduleHolidayDriver();
  if (!(options.numYears && options.output && options.country)) {
    return failure(new Error('Required options missing'));
  }
  try {
    const holidays = await Promise.all(Array(options.numYears).fill(null).map((_, i) =>
      driver.list(options.country, thisYear + i),
    ));
    const output = join(normalize(context.workspaceRoot), options.output);
    await writeFile(output, JSON.stringify(holidays.flatMap((e) => e)));
  } catch (err) {
    return failure(err);
  }

  return success();
}
