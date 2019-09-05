#!/bin/bash


set -e
set -u
set -o pipefail


# Build a DEB from the source files, using debuild.
builddeb() {
    set -x

    mkdir -p /debbuild/build-pkg/src
    cp -r /debbuild/pkg-meta/* /debbuild/build-pkg
    cp -r /debbuild/pkg-src/* /debbuild/build-pkg/src

    # Overwrite version if supported
    sed -i 's/_VERSION_/'"${VERSION}"'/g' "/debbuild/build-pkg/debian/changelog"

    pushd /debbuild/build-pkg 1>/dev/null
    debuild -b -uc -us

    cp /debbuild/*.deb /debbuild/result
    chown -R "${TARGET_UID}:${TARGET_GID}" /debbuild/result
}


# Build a DEB from an RPM file, using alien.
rpm2deb() {
    set -x

    pushd /debbuild/result 1> /dev/null
    alien --bump=0 /rpmbuild/source.rpm

    chown "${TARGET_UID}:${TARGET_GID}" * 
}

case ${1:- } in
    builddeb)
        builddeb
        ;;
    rpm2deb)
        rpm2deb
        ;;
    '')
        exec /bin/bash
        ;;
    *)
        exec "$@"
        ;;
esac
