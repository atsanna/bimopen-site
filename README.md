<h1 align="center">BIMopen — website</h1>

<p align="center">
  <a href="https://atsanna.github.io/bimopen-site/?lang=en"><b>Open the website</b></a>
</p>

<p align="center">
  <a href="https://atsanna.github.io/bimopen-site/?lang=en"><img src="docs/screenshot.png" alt="The BIMopen website: «You draw the building, the project writes itself», with the 3D view and the ground floor plan of the sample house" width="100%"></a>
</p>

This repository holds the **built** website of BIMopen, served by GitHub Pages, and the
**test builds** of the program in its [Releases](https://github.com/atsanna/bimopen-site/releases).
It contains no source code: only the pages, their translations and images, as they are published.

**BIMopen** is a BIM modeller written in pure Rust: you model
the building (levels, layered walls, doors and windows, curtain walls, floors, roofs, stairs,
rooms) and plans, sections, elevations, 3D views, schedules and sheets are views of the same
model, kept in step. It opens and exports IFC (IFC2x3 and IFC4), prints vector PDFs, exports
DXF/DWG and reads `.rvt` files. It runs in the browser and on the desktop, with two interface
styles (Classic and BIMopen) in six languages: Italian, English, German, French, Spanish and
Arabic (right to left).

Developed with [Claude Code](https://claude.com/claude-code).

## Download

Test builds for **Windows** (10/11, 64 bit), **Linux** (x86_64) and the **web** version are
published as prereleases under [Releases](https://github.com/atsanna/bimopen-site/releases),
with a `SHA256SUMS.txt` file to check them. The [download page](https://atsanna.github.io/bimopen-site/download.html)
of the website lists the latest one and what changed.

> [!WARNING]
> **Partial versions, for testing only.** These alpha builds are incomplete and meant only to
> try the program. They may contain errors, change without notice and give wrong results: do not
> use them for real projects or for documents with professional or legal value. They are
> provided "as is", without warranty of any kind; their use is entirely at the user's own risk,
> and the author accepts no liability for damage, data loss or any other consequence of their
> use. Always keep a copy of your files.

The source code is not public yet: it will be released as open source under MIT or Apache-2.0.
macOS builds will follow.

## License

This site and, once published, BIMopen are licensed under either of [MIT](LICENSE-MIT) or
[Apache-2.0](LICENSE-APACHE), at your option. See [NOTICE](NOTICE) for the dependencies and
their attributions.

<sub>Autodesk® and Revit® are trademarks or registered trademarks of Autodesk, Inc. BIMopen is an
independent project, not affiliated with or endorsed by Autodesk.</sub>
