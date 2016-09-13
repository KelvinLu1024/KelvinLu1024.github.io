#!/usr/local/bin/gosh -r7 

(import (scheme base)
        (scheme file)
        (scheme read)
        (file util)

        (only (gauche base)
              rxmatch
              rxmatch-before
              rxmatch-after
              regexp-replace
              file-is-directory?
              sys-system))


(define main
  (lambda ()
    (process-directory (current-directory))))


(define get-metadata
  (lambda (dir)
    (and (file-exists? dir)
         (call-with-input-file (subfile dir "meta.sc")
           (lambda (port) (read port))))))


(define process-directory
  (lambda (dir)
    (let ((meta (get-metadata dir)))
      (when meta
        (let-values (((prefix suffix)
                      (get-template dir)))
          (for-each
           (lambda (name)
             (process-file (subfile dir name)
                           prefix
                           suffix))
           (metadata->name-list meta)))))))


(define process-file
  (lambda (file pref suff)
    (if (file-is-directory? file)
        (process-directory file)
        (process-markdown file pref suff))))


(define process-markdown
  (lambda (md pref suff)
    (let ((html (regexp-replace ".md" md ".html")))
      (sys-system (string-append "md2html " md " > " html))
      (let ((embd (call-with-input-file html read-all)))
        (call-with-output-file html
          (lambda (port)
            (write-string pref port)
            (write-string embd port)
            (write-string suff port)))))))



(define metadata->name-list
  (lambda (meta)
    meta))


(define get-template
  (lambda (dir)
    (call-with-input-file (subfile dir "_template.html")
      (lambda (port)
        (let ((str (read-all port)))
          (regexp-split "<!--embed-->" str))))))


(define regexp-split
  (lambda (reg str)
    (let ((m (rxmatch reg str)))
      (values (rxmatch-before m)
              (rxmatch-after m)))))

(define subfile
  (lambda (dir name)
    (string-append dir "/" name)))


(define read-all
  (lambda (port)
    (read-string 99999 port)))


(main)
