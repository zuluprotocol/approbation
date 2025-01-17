# approbation

Scripts for producing a coverage matrix for Vega [specifications](https://github.com/vegaprotocol/specs)

```bash
npx github:vegaprotocol/approbation
```

# Available commands

All of the globs below are relatively simple - check out [globs primer](https://github.com/isaacs/node-glob#glob-primer) for how to get *more* specific (i.e. look for tests that reference only one specification) or less specific (all subfolders).
 
## check-codes
> Looks for possible errors in the coding of acceptance criteria

**Arguments**
| **Parameter**   | **Type** | **Description**                      | **Example**          |
|-----------------|----------|--------------------------------------|----------------------|
| `--specs`         | glob     | specs to pull AC codes from          | `{specs/**/*.md}`    |
| `--ignore`        | glob     | glob of files not to check for codes | `specs/0001-spec.md` |
| `--show-branches` | boolean  | Show git branches for subfolders of the current folder | -  | 

### check-codes example
```bash
npx github:vegaprotocol/approbation@latest check-filenames --specs="./specs-internal/protocol/**/*.{md,ipynb}" --show-branches 
```


## check-filenames
> Check that spec filenames are valid

**Arguments**
| **Parameter**   | **Type** | **Description**                      | **Example**          |
|-----------------|----------|--------------------------------------|----------------------|
| `--specs`         | glob     | specs to pull AC codes from          | `{specs/**/*.md}`    |
| `--ignore`        | glob     | glob of files not to check for codes | `specs/0001-spec.md` |
| `--show-branches` | boolean  | Show git branches for subfolders of the current folder | -  | 

### check-filenames example
```bash
npx github:vegaprotocol/approbation@latest check-codes --specs="./specs/protocol/**/*.{md,ipynb}" --tests="./MultisigControl/test/*.js" --ignore="./specs/protocol/{0001-*,0002-*,0004-*}" --show-branches 
```


## check-references
> Coverage statistics for acceptance criteria
    
**Arguments**
**Arguments**
| **Parameter**   | **Type** | **Description**                      | **Example**          |
|-----------------|----------|--------------------------------------|----------------------|
| `--tests`         | glob     | tests to check for AC codes          | `tests/**/*.{py,feature}`    |
| `--specs`         | glob     | specs to pull AC codes from          | `{specs/**/*.md}`    |
| `--ignore`        | glob     | glob of files not to check for codes | `specs/0001-spec.md` |
| `--categories`  | string  | JSON file that contains category mappings for specs          | `specs/categories.json`    |
| `--show-branches` | boolean  | Show git branches for subfolders of the current folder | -  | 
| `--show-mystery`  | boolean  | display criteria in tests that are not in any specs matched by `--specs`          | -    |
| `--show-files`  | boolean  | display basic stats per file         | -    |
| `--show-file-stats`  | boolean  | display detailed stats per file         | -    |
| `--output-csv`  | boolean  | Outputs a CSV file to summarise the console output          | -    |
| `--output-jenkins`  | boolean  | Outputs a text file to summarise the console output, to sendover to jenkins          | -    |
| `--verbose`  | boolean  | MORE output        | -    |

### check-references example
```bash
npx github:vegaprotocol/approbation@latest check-references --specs="./specs/protocol/**/*.{md,ipynb}" --tests="./MultisigControl/test/*.js" --ignore="./specs/protocol/{0001-*}" --categories="specs/protocol/categories.json" --show-branches --show-mystery
```


# Background
Each [protocol specification](https://github.com/vegaprotocol/specs) receives a sequence number when it is merged in to master. 
This sequence number is a 0-padded integer, strictly 1 greater than the last merged 
specification. The sequence number is the start of the filename, with the end result
that the `./protocol/` folder lists files in the order they were created.

After the sequence number, separated by a `-`, is a 4 letter code. This is arbitrary,
and can be made up at merge time. It's there as a helpful hint as to what spec `0001` is,
rather that having to keep that in mind.

The end result is that every specification (`.md` or `.ipynb`) should be named something like:
```
0024-EXMP-example-specification
```

## Acceptance Criteria codes
Acceptance Criteria codes use the first two parts of the filename (detailed above), and then
another sequence number (this time, 0 padded to 3 characters). These are assigned to each specific
acceptance criteria that should be validated by a test (in any test suite.l)

## The result
The result of the rules above is that we can easily map which acceptance criteria are covered
in which test suite, and what our coverage for the main features identified in specs are. This
is the task that these scripts solve.

## How to name a spec
1. When your pull request is ready to merge, take a look at the most recent sequence number in the
`protocol` folder. Maybe the last spec was `0088-BLAH-example.md`. Your sequence number is `0089`.
2. Now, make yourself a code based on the filename. It should be unique, and it should be memorable,
so for example if the spec is `system_accounts.md`, it *could* be 'SYSA', or 'SYAC' - whatever feels
reasonable.
3. Rename your file to `0088-SYSA-system_accounts.md`
4. Label the acceptance criteria `0088-SYSA-001`, `0088-SYSA-002` and so on.
5. Merge!

## How to reference acceptance criteria in a spec.
These are more *convention* than a rule, but following these steps will ensure that the scripts in 
this folder pick up your references.

1. When you are writing your feature, take a look at the acceptance criteria.
2. If you're addressing one, reference it at the end of the Feature name, for example if you are 
writing a test that covers `0008-SYSA-001`, call the feature `Verify blah (0008-SYSA-001)`
3. If it covers more than one feature, add it inside the same brackets: `Verify blah (0008-SYSA-001, 0008-SYSA-002)`
4. If a feature test intentionally covers something that isn't explicitly an acceptance criteria
you can signal this with `0008-SYSA-additional-tests`

# Development
Run `npm run setup` to configure your environment:

- Linting uses [standard](https://www.npmjs.com/package/standard)
- Tests are run pre-push by [Husky](https://www.npmjs.com/package/husky)
- Package is published to `npm` on tag

# Use in CI
```shell
npx --silent --yes github:vegaprotocol/approbation
```

# [License](./LICENSE)
The Unlicense

<p align="right">
 <img src="https://user-images.githubusercontent.com/6678/159024710-42ae880f-b994-44af-b91d-b3fca3f49685.png" width="80" height="80" />
</p>
